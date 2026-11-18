import { ImageResponse } from 'next/og';

export const alt = 'Tip Top Uniforms Qatar — Uniforms & Bespoke Tailoring in Doha';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
          background: '#111111',
          color: '#FFFFFF',
        }}
      >
        <div style={{ display: 'flex', fontSize: 28, letterSpacing: 6, color: '#FF6200', fontWeight: 700 }}>
          DOHA · QATAR · SINCE 1998
        </div>
        <div style={{ display: 'flex', fontSize: 104, fontWeight: 900, lineHeight: 1.05, marginTop: 24 }}>
          TIP TOP UNIFORMS
        </div>
        <div style={{ display: 'flex', fontSize: 40, color: '#D1D5DB', marginTop: 24 }}>
          School · Corporate · Hospitality · Industrial Uniforms
        </div>
        <div style={{ display: 'flex', fontSize: 32, color: '#9CA3AF', marginTop: 12 }}>
          Bespoke tailoring, made to measure
        </div>
        <div style={{ display: 'flex', width: 120, height: 8, background: '#FF6200', marginTop: 48 }} />
      </div>
    ),
    { ...size },
  );
}
