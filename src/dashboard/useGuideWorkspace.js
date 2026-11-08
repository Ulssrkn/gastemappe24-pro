import { useEffect, useRef, useState } from 'react';
import { supabase } from '../lib/supabaseClient.js';
import {
  insertAccommodation,
  loadGuideWorkspace,
  removeAccommodation,
  saveAccommodation,
  savePackagePreference,
} from './workspaceApi.js';
import useModalFocus from '../components/useModalFocus.js';
import {
  demoCategories,
  demoHotel,
  emptyHotel,
  normalizeHotel,
  quickAccessDefaults,
} from '../guide/guideContent.js';

export default function useGuideWorkspace({
  authSession,
  recoveringPassword,
  ownerRef,
  guestSlug,
  setSelectedCategory,
  pilot,
}) {
  const [loadedOwnerId, setLoadedOwnerId] = useState(null);
  const operationRef = useRef(false);
  const [guidePublished, setGuidePublished] = useState(false);
  const [hotelRecord, setHotelRecord] = useState(null);
  const [hotelRecords, setHotelRecords] = useState([]);
  const [selectedHotelId, setSelectedHotelId] = useState('');
  const [accountRecord, setAccountRecord] = useState(null);
  const [trialNow, setTrialNow] = useState(Date.now());
  const [clonePreviewOpen, setClonePreviewOpen] = useState(false);
  const [createAccommodationOpen, setCreateAccommodationOpen] = useState(false);
  const [newAccommodationName, setNewAccommodationName] = useState('');
  const [deleteAccommodationTarget, setDeleteAccommodationTarget] = useState(null);
  const [requestedPlanCode, setRequestedPlanCode] = useState('single');

  const [cloneOptions, setCloneOptions] = useState({ categories: true, texts: true, design: true });
  const [cloudDataStatus, setCloudDataStatus] = useState('idle');
  const [cloudDataError, setCloudDataError] = useState('');
  const [isEditorModalOpen, setIsEditorModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [isSaved, setIsSaved] = useState(false);
  const [qrPrintFormat, setQrPrintFormat] = useState('a4');

  const guestPageUrl =
    typeof window !== 'undefined'
      ? hotelRecord?.slug
        ? `${window.location.origin}/g/${hotelRecord.slug}`
        : `${window.location.origin}${window.location.pathname}`
      : '';
  const [quickEditLang, setQuickEditLang] = useState('de');
  const [hotel, setHotel] = useState(() => (guestSlug ? emptyHotel() : demoHotel()));
  const [categories, setCategories] = useState(() => (guestSlug ? [] : demoCategories));

  useEffect(() => {
    const timer = window.setInterval(() => setTrialNow(Date.now()), 60000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const userId = authSession?.user?.id;
    setLoadedOwnerId(null);
    setHotelRecord(null);
    setHotelRecords([]);
    setSelectedHotelId('');
    setAccountRecord(null);
    setRequestedPlanCode('single');
    setSelectedCategory(null);
    setEditingCategory(null);
    setIsEditorModalOpen(false);
    setCreateAccommodationOpen(false);
    setClonePreviewOpen(false);
    setDeleteAccommodationTarget(null);
    setIsSaved(false);
    setGuidePublished(false);
    operationRef.current = false;
    if (!guestSlug) {
      setHotel(userId ? emptyHotel() : demoHotel());
      setCategories(userId ? [] : demoCategories);
    }
    if (!supabase || !userId || guestSlug || recoveringPassword) {
      setCloudDataStatus('idle');
      setCloudDataError('');
      return undefined;
    }

    let active = true;
    const loadOrCreateHotel = async () => {
      setCloudDataStatus('loading');
      setCloudDataError('');
      try {
        const { records, account } = await loadGuideWorkspace(userId);
        if (!active || ownerRef.current.id !== userId) return;
        setHotelRecords(records);
        applyAccommodation(records[0]);
        setAccountRecord(account || null);
        setRequestedPlanCode(account?.requested_plan_code || 'single');
        setLoadedOwnerId(userId);
        setCloudDataStatus('ready');
      } catch (error) {
        if (!active) return;
        console.error('Hotel cloud data could not be loaded:', error);
        setCloudDataError(error?.message || 'Die Unterkunftsdaten konnten nicht geladen werden.');
        setCloudDataStatus('error');
      }
    };

    loadOrCreateHotel();
    return () => {
      active = false;
    };
  }, [authSession?.user?.id, guestSlug, recoveringPassword]);
  const updateQuickCardText = (cardId, field, value) =>
    setHotel((prev) => ({
      ...prev,
      quickAccessContent: {
        ...(prev.quickAccessContent || quickAccessDefaults),
        [quickEditLang]: {
          ...(prev.quickAccessContent?.[quickEditLang] || quickAccessDefaults[quickEditLang]),
          [cardId]: {
            ...(prev.quickAccessContent?.[quickEditLang]?.[cardId] ||
              quickAccessDefaults[quickEditLang][cardId]),
            [field]: value,
          },
        },
      },
    }));
  const handleSaveCategoryModal = (catData) => {
    setCategories((prev) => {
      const exists = prev.find((c) => c.id === catData.id);
      if (exists) {
        return prev.map((c) => (c.id === catData.id ? catData : c));
      }
      return [...prev, catData];
    });
  };

  const handleDeleteCategory = (id) => {
    setCategories((prev) => prev.filter((cat) => cat.id !== id));
  };

  const applyAccommodation = (selected) => {
    setHotelRecord(selected);
    setSelectedHotelId(selected.id);
    setHotel(normalizeHotel(selected.profile?.hotel, selected.name));
    setCategories(Array.isArray(selected.profile?.categories) ? selected.profile.categories : []);
    setGuidePublished(Boolean(Object.keys(selected.public_content || {}).length));
    setIsSaved(false);
    setSelectedCategory(null);
    setEditingCategory(null);
    setIsEditorModalOpen(false);
  };

  const canManage = Boolean(
    loadedOwnerId && loadedOwnerId === authSession?.user?.id && hotelRecord?.owner_id === loadedOwnerId
  );

  const selectAccommodation = (id) => {
    if (!canManage || operationRef.current) return;
    const selected = hotelRecords.find((item) => item.id === id);
    if (selected) applyAccommodation(selected);
  };

  const createAccommodation = async () => {
    if (!canManage || !accountRecord || operationRef.current || trialExpired) return;
    if (hotelRecords.length >= accommodationLimit) {
      setCloudDataError(`Dein aktuelles Paket erlaubt höchstens ${accommodationLimit} Unterkünfte.`);
      return;
    }
    const newHotel = emptyHotel(newAccommodationName.trim());
    if (!newHotel.name) return;
    const requestOwner = ownerRef.current;
    operationRef.current = true;
    setCloudDataStatus('saving');
    try {
      const slugBase = 'unterkunft-' + crypto.randomUUID().replace(/-/g, '');
      const { data: created, error } = await insertAccommodation(authSession.user.id, slugBase, newHotel.name, {
        hotel: newHotel,
        categories: [],
      });
      if (error) throw error;
      if (ownerRef.current !== requestOwner) return;
      setHotelRecords((previous) => [...previous, created]);
      applyAccommodation(created);
      setCreateAccommodationOpen(false);
      setCloudDataStatus('ready');
    } catch (error) {
      if (ownerRef.current !== requestOwner) return;
      setCloudDataError(error?.message || pilot.saveFailed);
      setCloudDataStatus('error');
    } finally {
      if (ownerRef.current === requestOwner) operationRef.current = false;
    }
  };

  const cloneAccommodation = async () => {
    if (!canManage || !accountRecord || trialExpired || accommodationLimitReached || operationRef.current)
      return;
    const removePrivateFields = (value) => {
      if (Array.isArray(value)) return value.map(removePrivateFields);
      if (!value || typeof value !== 'object') return value;
      return Object.fromEntries(
        Object.entries(value)
          .filter(
            ([key]) =>
              !/^(id|.*(?:wifi|password|passwort|ssid|address|adresse|phone|telefon|mobile|email|contact|kontakt|slug|qr|analytics|owner).*)$/i.test(
                key
              )
          )
          .map(([key, nested]) => [key, removePrivateFields(nested)])
      );
    };
    const source = hotel || {};
    const clonedHotel = {
      ...source,
      name: `Kopie von ${source.name || hotelRecord.name || 'Unterkunft'}`,
      logoUrl: '',
      locationTitle: '',
      address: '',
      phone: '',
      email: '',
      website: '',
      reviewPlatform: 'google',
      googleReviewUrl: '',
      wifiSsid: '',
      wifiPass: '',
      publishGuestWifi: false,
      images: [],
      themeColor: cloneOptions.design ? source.themeColor : 'amber',
      breakfastTime: cloneOptions.texts ? source.breakfastTime || '' : '',
      checkInOut: cloneOptions.texts ? source.checkInOut || '' : '',
      parkingInfo: cloneOptions.texts ? source.parkingInfo || '' : '',
      quickAccessContent: cloneOptions.texts ? removePrivateFields(source.quickAccessContent || {}) : {},
    };
    const clonedCategories = cloneOptions.categories
      ? (categories || []).map((category) => ({
          ...removePrivateFields(category),
          id:
            globalThis.crypto?.randomUUID?.() || `cat-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        }))
      : [];
    const slug = 'kopie-' + crypto.randomUUID().replace(/-/g, '');
    const requestOwner = ownerRef.current;
    operationRef.current = true;
    setCloudDataStatus('saving');
    try {
      const { data: created, error } = await insertAccommodation(authSession.user.id, slug, clonedHotel.name, {
        hotel: clonedHotel,
        categories: clonedCategories,
      });
      if (error) throw error;
      if (ownerRef.current !== requestOwner) return;
      setHotelRecords((previous) => [...previous, created]);
      applyAccommodation(created);
      setClonePreviewOpen(false);
      setCloudDataStatus('ready');
    } catch (error) {
      if (ownerRef.current !== requestOwner) return;
      setCloudDataError(error?.message || pilot.saveFailed);
      setCloudDataStatus('error');
    } finally {
      if (ownerRef.current === requestOwner) operationRef.current = false;
    }
  };

  const deleteAccommodation = async () => {
    const target = deleteAccommodationTarget;
    if (!canManage || !target || hotelRecords.length <= 1 || operationRef.current) return;
    const requestOwner = ownerRef.current;
    operationRef.current = true;
    setCloudDataStatus('saving');
    setCloudDataError('');
    try {
      const { error } = await removeAccommodation(requestOwner.id, target.id);
      if (error) throw error;
      if (ownerRef.current !== requestOwner) return;
      const remaining = hotelRecords.filter((item) => item.id !== target.id);
      setHotelRecords(remaining);
      setDeleteAccommodationTarget(null);
      if (hotelRecord?.id === target.id) applyAccommodation(remaining[0]);
      setCloudDataStatus('ready');
    } catch (error) {
      if (ownerRef.current !== requestOwner) return;
      setCloudDataError(error?.message || pilot.saveFailed);
      setCloudDataStatus('error');
    } finally {
      if (ownerRef.current === requestOwner) operationRef.current = false;
    }
  };

  const chooseRequestedPlan = async (planCode) => {
    if (!canManage) return;
    const requestOwner = ownerRef.current;
    try {
      const { data, error } = await savePackagePreference(requestOwner.id, planCode);
      if (error) throw error;
      if (ownerRef.current !== requestOwner) return;
      setAccountRecord(data);
      setRequestedPlanCode(planCode);
    } catch (error) {
      if (ownerRef.current !== requestOwner) return;
      console.error('Package preference could not be saved:', error);
      setCloudDataError('Die Paketvormerkung konnte nicht gespeichert werden. Bitte erneut versuchen.');
    }
  };

  const trialEndsAt = accountRecord?.trial_ends_at ? new Date(accountRecord.trial_ends_at).getTime() : null;
  const trialEndDate = trialEndsAt ? new Date(trialEndsAt) : null;
  const trialToday = new Date(trialNow);
  const trialDaysLeft = trialEndDate
    ? Math.max(
        0,
        Math.round(
          (Date.UTC(trialEndDate.getFullYear(), trialEndDate.getMonth(), trialEndDate.getDate()) -
            Date.UTC(trialToday.getFullYear(), trialToday.getMonth(), trialToday.getDate())) /
            86400000
        )
      )
    : null;
  const trialExpired = Boolean(
    accountRecord &&
      accountRecord.subscription_status !== 'active' &&
      (accountRecord.subscription_status !== 'trial' || trialEndsAt === null || trialEndsAt <= trialNow)
  );
  const accommodationLimit =
    accountRecord?.subscription_status === 'trial'
      ? 3
      : accountRecord?.subscription_status === 'active'
        ? { single: 1, multi: 3, business: 10 }[accountRecord.plan_code] || 1
        : 0;
  const accommodationLimitReached = hotelRecords.length >= accommodationLimit;
  const handleSaveData = async (publish = false) => {
    if (!canManage || trialExpired || operationRef.current) return;
    const requestOwner = ownerRef.current;
    operationRef.current = true;
    setCloudDataStatus('saving');
    setCloudDataError('');
    const profile = { hotel, categories };
    try {
      const { data, error } = await saveAccommodation(requestOwner.id, hotelRecord.id, {
        name: hotel.name.trim() || hotelRecord.name,
        profile,
        ...(publish ? { public_content: profile } : {}),
        updated_at: new Date().toISOString(),
      });
      if (error) throw error;
      if (ownerRef.current !== requestOwner) return;
      setHotelRecord(data);
      setHotelRecords((previous) => previous.map((item) => (item.id === data.id ? data : item)));
      setGuidePublished(Boolean(Object.keys(data.public_content || {}).length));
      setCloudDataStatus('ready');
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 3000);
    } catch (error) {
      if (ownerRef.current !== requestOwner) return;
      setCloudDataError(error?.message || pilot.saveFailed);
      setCloudDataStatus('error');
    } finally {
      if (ownerRef.current === requestOwner) operationRef.current = false;
    }
  };
  const removeImage = (index) => {
    setHotel((prev) => ({ ...prev, images: prev.images.filter((_, i) => i !== index) }));
  };
  useModalFocus(
    createAccommodationOpen || Boolean(deleteAccommodationTarget) || clonePreviewOpen || isEditorModalOpen,
    () => {
      if (operationRef.current) return;
      setCreateAccommodationOpen(false);
      setDeleteAccommodationTarget(null);
      setClonePreviewOpen(false);
      setIsEditorModalOpen(false);
      setEditingCategory(null);
    }
  );

  return {
    accountRecord,
    accommodationLimit,
    accommodationLimitReached,
    canManage,
    categories,
    chooseRequestedPlan,
    cloneAccommodation,
    cloneOptions,
    clonePreviewOpen,
    cloudDataError,
    cloudDataStatus,
    createAccommodation,
    createAccommodationOpen,
    deleteAccommodation,
    deleteAccommodationTarget,
    editingCategory,
    guestPageUrl,
    guidePublished,
    handleDeleteCategory,
    handleSaveCategoryModal,
    handleSaveData,
    hotel,
    hotelRecord,
    hotelRecords,
    isEditorModalOpen,
    isSaved,
    newAccommodationName,
    qrPrintFormat,
    quickEditLang,
    removeImage,
    requestedPlanCode,
    selectAccommodation,
    selectedHotelId,
    setCategories,
    setCloneOptions,
    setClonePreviewOpen,
    setCreateAccommodationOpen,
    setDeleteAccommodationTarget,
    setEditingCategory,
    setHotel,
    setIsEditorModalOpen,
    setNewAccommodationName,
    setQrPrintFormat,
    setQuickEditLang,
    trialDaysLeft,
    trialExpired,
    updateQuickCardText,
  };
}
