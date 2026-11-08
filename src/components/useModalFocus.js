import { useLayoutEffect, useRef } from 'react';

const focusable = 'button:not([disabled]), input:not([disabled]):not([type=hidden]), select:not([disabled]), textarea:not([disabled]), a[href], [tabindex="0"]';

export default function useModalFocus(open, close) {
  const closeRef = useRef(close);
  useLayoutEffect(() => { closeRef.current = close; }, [close]);

  useLayoutEffect(() => {
    if (!open) return;
    const dialog = document.querySelector('[aria-modal="true"]');
    if (!dialog) return;
    const trigger = document.activeElement;
    const controls = () => [...dialog.querySelectorAll(focusable)].filter(element => element.getClientRects().length);
    (dialog.querySelector('[data-initial-focus]') || controls()[0] || dialog).focus();

    const handleKey = event => {
      if (event.key === 'Escape') {
        event.preventDefault();
        closeRef.current();
        return;
      }
      if (event.key !== 'Tab') return;
      const items = controls();
      const first = items[0];
      const last = items.at(-1);
      const current = document.activeElement;
      if (!first || !dialog.contains(current) || (event.shiftKey && current === first) || (!event.shiftKey && current === last)) {
        event.preventDefault();
        ((event.shiftKey ? last : first) || dialog).focus();
      }
    };

    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('keydown', handleKey);
      if (trigger instanceof HTMLElement && trigger.isConnected) trigger.focus();
    };
  }, [open]);
}
