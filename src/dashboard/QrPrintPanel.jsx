import React from 'react';
import { Copy, Printer, QrCode, Save } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import createQrPdf from '../guide/createQrPdf.js';

export default function QrPrintPanel({
  currentTheme,
  guestPageUrl,
  hotel,
  pilot,
  qrPrintFormat,
  setQrPrintFormat,
  t,
}) {
  return (
    <div
      id="editor-qr"
      className="scroll-mt-24 bg-white rounded-3xl p-6 border border-stone-200 shadow-sm space-y-4"
    >
      <div className="flex items-center gap-3">
        <div className={`p-3 rounded-2xl ${currentTheme.bgLight} ${currentTheme.text}`}>
          <QrCode className="w-6 h-6" />
        </div>
        <div>
          <h3 className={`font-black text-xs ${currentTheme.text} uppercase tracking-wider`}>{t.sec5Title}</h3>
          <p className="text-xs text-stone-500">{t.qrTitle}</p>
        </div>
      </div>
      <style>{`@page { size: ${qrPrintFormat === 'a4' ? 'A4 portrait' : qrPrintFormat === 'a5' ? 'A5 portrait' : '150mm 100mm'};margin:0 } @media print { html,body{margin:0!important;padding:0!important;width:100%!important;height:100%!important} body *{visibility:hidden!important} #qr-print-area,#qr-print-area *{visibility:visible!important} #qr-print-area{display:block!important;position:fixed!important;inset:0;width:100%;height:100%;background:#f4f1e9!important} #qr-print-area .qr-sheet{box-sizing:border-box;width:100%;height:100%;padding:10mm;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;font-family:Arial,sans-serif;color:#172b3a} #qr-print-area .qr-frame{width:fit-content;max-width:100%;padding:9mm;border:1px solid #e7e1d5;border-radius:8mm;background:#fff;display:flex;flex-direction:column;align-items:center;gap:3mm} #qr-print-area .qr-frame img{width:14mm;height:14mm;object-fit:cover;border-radius:50%} #qr-print-area .qr-frame>div{font-size:9pt;letter-spacing:3pt;color:#a47b3b;font-weight:bold} #qr-print-area h1{font-size:26pt;font-weight:800;margin:0} #qr-print-area p{margin:0;color:#697783} #qr-print-area svg{width:${qrPrintFormat === 'a4' ? '76mm' : qrPrintFormat === 'a5' ? '62mm' : '34mm'}!important;height:auto!important} #qr-print-area strong{font-size:14pt} #qr-print-area span,#qr-print-area footer{font-size:8pt;color:#77828b;letter-spacing:1pt} }`}</style>
      <div className="grid grid-cols-1 lg:grid-cols-[.9fr_1.1fr] gap-6 items-center pt-2">
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {[
              ['a4', 'A4'],
              ['a5', 'A5'],
              ['card', 'Karte'],
            ].map(([v, l]) => (
              <button
                key={v}
                onClick={() => setQrPrintFormat(v)}
                className={`px-4 py-2 rounded-xl text-xs font-bold border ${qrPrintFormat === v ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-600 border-stone-200'}`}
              >
                {l}
              </button>
            ))}
          </div>
          <div className="rounded-2xl bg-slate-900 text-white p-5">
            <span className="text-[10px] uppercase tracking-[.24em] text-amber-300 font-bold">
              Gastemappe24 Pro
            </span>
            <h4 className="text-lg font-black mt-2">Ein QR-Code. Alles für Ihre Gäste.</h4>
            <p className="text-xs text-slate-300 mt-2">
              Scannen und direkt die digitale Gästemappe öffnen – ohne App und ohne Anmeldung.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => window.print()}
              className="px-4 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold flex items-center gap-2"
            >
              <Printer className="w-4 h-4" />
              {pilot.print}
            </button>
            <button
              onClick={async () => {
                try {
                  const el = document.querySelector('#qr-print-area svg');
                  if (!el) throw Error('QR fehlt');
                  await createQrPdf({
                    svg: new XMLSerializer().serializeToString(el),
                    hotelName: hotel.name,
                    logoUrl: hotel.logoUrl,
                    format: qrPrintFormat,
                  });
                } catch (e) {
                  console.error(e);
                  alert('PDF konnte nicht erstellt werden. Bitte erneut versuchen.');
                }
              }}
              className="px-4 py-2.5 rounded-xl border border-emerald-700 text-emerald-800 bg-emerald-50 text-xs font-bold flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              {pilot.pdf}
            </button>
            <button
              onClick={() => navigator.clipboard?.writeText(guestPageUrl)}
              className="px-4 py-2.5 rounded-xl border border-stone-200 bg-white text-xs font-bold flex items-center gap-2"
            >
              <Copy className="w-4 h-4" />
              {pilot.copyLink}
            </button>
          </div>
          <p className="text-[10px] text-stone-400 break-all">{guestPageUrl}</p>
          <p className="text-[10px] text-emerald-700 font-semibold">
            Kostenlos · Keine externe API · Keine laufenden Zusatzkosten
          </p>
        </div>
        <div className="rounded-[28px] bg-[#f4f1e9] p-4 sm:p-7 border border-stone-200">
          <div className="mx-auto max-w-[390px] bg-white rounded-[24px] overflow-hidden shadow-xl border border-stone-200">
            <div className="h-2 bg-[#172b3a]" />
            <div className="px-6 py-7 text-center">
              {hotel.logoUrl ? (
                <img
                  src={hotel.logoUrl}
                  alt="Hotel Logo"
                  className="w-12 h-12 rounded-full object-cover mx-auto mb-4 border"
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-[#172b3a] text-amber-300 mx-auto mb-4 flex items-center justify-center font-black text-lg">
                  {(hotel.name || 'H').slice(0, 1).toUpperCase()}
                </div>
              )}
              <p className="text-[9px] font-black tracking-[.28em] text-amber-700 uppercase mb-2">Willkommen</p>
              <h4 className="text-2xl font-black tracking-tight text-slate-900">
                {hotel.name || 'Ihre Unterkunft'}
              </h4>
              <p className="text-xs text-stone-500 mt-1">Ihre digitale Gästemappe</p>
              <div className="my-5 inline-flex p-3 rounded-2xl border border-stone-100">
                <QRCodeSVG
                  value={guestPageUrl || 'https://example.com'}
                  size={qrPrintFormat === 'card' ? 130 : 190}
                  level="H"
                  includeMargin
                />
              </div>
              <p className="text-sm font-extrabold text-slate-900">Scannen & entdecken</p>
              <p className="text-[10px] text-stone-500 mt-1">WLAN · Services · Informationen · Umgebung</p>
            </div>
            <div className="bg-[#172b3a] text-white text-center py-3 text-[9px] font-bold tracking-[.2em]">
              GASTEMAPPE24 PRO
            </div>
          </div>
          <p className="text-center text-[10px] text-stone-500 mt-3">
            Live-Vorschau · {qrPrintFormat.toUpperCase()}
          </p>
        </div>
      </div>
      <div id="qr-print-area" className="hidden">
        <div className="qr-sheet">
          <div className="qr-frame">
            {hotel.logoUrl && <img src={hotel.logoUrl} alt="Logo" />}
            <div>WILLKOMMEN</div>
            <h1>{hotel.name || 'Ihre Unterkunft'}</h1>
            <p>Ihre digitale Gästemappe</p>
            <QRCodeSVG value={guestPageUrl || 'https://example.com'} size={320} level="H" includeMargin />
            <strong>Scannen & entdecken</strong>
            <span>WLAN · Services · Informationen · Umgebung</span>
          </div>
          <footer>GASTEMAPPE24 PRO</footer>
        </div>
      </div>
    </div>
  );
}
