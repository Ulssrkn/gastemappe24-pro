const createQrPdf = async ({ svg, hotelName, logoUrl, format }) => {
  const [pw, ph] = format === 'a4' ? [595.28, 841.89] : format === 'a5' ? [419.53, 595.28] : [425.2, 283.46],
    scale = 2;
  const cv = document.createElement('canvas');
  cv.width = Math.round(pw * scale);
  cv.height = Math.round(ph * scale);
  const c = cv.getContext('2d');
  if (!c) throw Error('Canvas unavailable');
  const w = cv.width,
    h = cv.height,
    p = 36 * scale,
    x = w / 2;
  c.fillStyle = '#f4f1e9';
  c.fillRect(0, 0, w, h);
  c.fillStyle = '#fff';
  c.beginPath();
  c.roundRect(p, p, w - 2 * p, h - 2 * p, 22 * scale);
  c.fill();
  c.fillStyle = '#172b3a';
  c.fillRect(p, p, w - 2 * p, 12 * scale);
  let y = p + 55 * scale;
  if (logoUrl) {
    try {
      const l = new Image();
      l.crossOrigin = 'anonymous';
      await new Promise((a, b) => {
        l.onload = a;
        l.onerror = b;
        l.src = logoUrl;
      });
      const z = 48 * scale;
      c.save();
      c.beginPath();
      c.arc(x, y + z / 2, z / 2, 0, 7);
      c.clip();
      c.drawImage(l, x - z / 2, y, z, z);
      c.restore();
      y += z + 10 * scale;
    } catch (_) {}
  }
  c.textAlign = 'center';
  c.fillStyle = '#a47b3b';
  c.font = `bold ${10 * scale}px Arial`;
  c.fillText('WILLKOMMEN', x, y);
  y += 28 * scale;
  c.fillStyle = '#172b3a';
  c.font = `bold ${(format === 'card' ? 19 : 31) * scale}px Arial`;
  c.fillText((hotelName || 'Ihre Unterkunft').slice(0, 36), x, y);
  y += 30 * scale;
  c.fillStyle = '#697783';
  c.font = `${13 * scale}px Arial`;
  c.fillText('Ihre digitale Gästemappe', x, y);
  y += 24 * scale;
  const im = new Image(),
    u = URL.createObjectURL(new Blob([svg], { type: 'image/svg+xml' }));
  try {
    await new Promise((a, b) => {
      im.onload = a;
      im.onerror = b;
      im.src = u;
    });
    const q = Math.min(w * 0.43, h - y - p - 100 * scale);
    c.drawImage(im, (w - q) / 2, y, q, q);
    y += q + 25 * scale;
  } finally {
    URL.revokeObjectURL(u);
  }
  c.fillStyle = '#172b3a';
  c.font = `bold ${15 * scale}px Arial`;
  c.fillText('Scannen & entdecken', x, Math.min(y, h - p - 65 * scale));
  c.fillStyle = '#77828b';
  c.font = `${8 * scale}px Arial`;
  c.fillText('WLAN · Services · Informationen · Umgebung', x, h - p - 34 * scale);
  c.font = `bold ${7 * scale}px Arial`;
  c.fillText('GASTEMAPPE24 PRO', x, h - p - 17 * scale);
  const jpg = await new Promise((a) => cv.toBlob(a, 'image/jpeg', 0.94));
  if (!jpg) throw Error('Export fehlgeschlagen');
  const data = new Uint8Array(await jpg.arrayBuffer()),
    te = new TextEncoder(),
    chunks = [];
  let pos = 0,
    offs = [];
  const put = (v) => {
      const b = typeof v === 'string' ? te.encode(v) : v;
      chunks.push(b);
      pos += b.length;
    },
    obj = (n, v) => {
      offs[n] = pos;
      put(`${n} 0 obj\n${v}\nendobj\n`);
    };
  put('%PDF-1.4\n');
  obj(1, '<< /Type /Catalog /Pages 2 0 R >>');
  obj(2, '<< /Type /Pages /Kids [3 0 R] /Count 1 >>');
  obj(
    3,
    `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${pw} ${ph}] /Resources << /XObject << /Im0 4 0 R >> >> /Contents 5 0 R >>`
  );
  offs[4] = pos;
  put(
    `4 0 obj\n<< /Type /XObject /Subtype /Image /Width ${cv.width} /Height ${cv.height} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${data.length} >>\nstream\n`
  );
  put(data);
  put('\nendstream\nendobj\n');
  const stream = te.encode(`q ${pw} 0 0 ${ph} 0 0 cm /Im0 Do Q`);
  offs[5] = pos;
  put(`5 0 obj\n<< /Length ${stream.length} >>\nstream\n`);
  put(stream);
  put('\nendstream\nendobj\n');
  const xref = pos;
  put('xref\n0 6\n0000000000 65535 f \n');
  for (let i = 1; i <= 5; i++) put(`${String(offs[i]).padStart(10, '0')} 00000 n \n`);
  put(`trailer\n<< /Size 6 /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF`);
  const url = URL.createObjectURL(new Blob(chunks, { type: 'application/pdf' })),
    a = document.createElement('a');
  a.href = url;
  a.download = `${(hotelName || 'Gastemappe24').replace(/[^a-z0-9-_]+/gi, '-')}-QR-${format.toUpperCase()}.pdf`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1500);
};

export default createQrPdf;
