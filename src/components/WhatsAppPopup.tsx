import { useState, useEffect } from 'react';
import { config } from '../config';

export default function WhatsAppPopup() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 9999,
      display: 'flex',
      justifyContent: 'center',
      padding: '0 16px 20px',
      pointerEvents: 'none',
      animation: 'waFadeUp 0.45s cubic-bezier(0.16, 1, 0.3, 1)',
    }}>
      <style>{`
        @keyframes waFadeUp {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>

      <div style={{
        pointerEvents: 'auto',
        width: '100%',
        maxWidth: 380,
        background: '#fff',
        borderRadius: 20,
        boxShadow: '0 12px 48px rgba(0,0,0,0.2)',
        padding: '20px 20px 16px',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          marginBottom: 12,
        }}>
          <div style={{
            width: 44,
            height: 44,
            borderRadius: 12,
            background: '#dcf8c6',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}>
            <svg viewBox="0 0 24 24" width="26" height="26" fill="#25D366">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
          </div>
          <div style={{ flex: 1 }}>
            <strong style={{ fontSize: 15, color: '#1a1a1a', display: 'block' }}>
              Join YoSinTV Whatsapp
            </strong>
            <span style={{ fontSize: 12, color: '#888', marginTop: 1, display: 'block' }}>
              Join Our Community
            </span>
          </div>
        </div>

        <p style={{
          margin: '0 0 16px',
          fontSize: 13,
          color: '#666',
          lineHeight: 1.5,
          paddingLeft: 56,
        }}>
          Get latest updates, breaking news and exclusive content directly on WhatsApp.
        </p>

        <a
          href={config.links.social.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            width: '100%',
            padding: '14px 0',
            background: 'linear-gradient(135deg, #25D366, #128C7E)',
            color: '#fff',
            border: 'none',
            borderRadius: 14,
            fontSize: 15,
            fontWeight: 700,
            cursor: 'pointer',
            textDecoration: 'none',
            letterSpacing: 0.3,
            transition: 'transform 0.15s, box-shadow 0.15s',
          }}
          onMouseEnter={e => {
            (e.target as HTMLElement).style.transform = 'translateY(-1px)';
            (e.target as HTMLElement).style.boxShadow = '0 6px 20px rgba(37,211,102,0.35)';
          }}
          onMouseLeave={e => {
            (e.target as HTMLElement).style.transform = '';
            (e.target as HTMLElement).style.boxShadow = '';
          }}
        >
          👥 Join YoSinTV Whatsapp
        </a>

        <button
          onClick={() => setVisible(false)}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 6,
            width: '100%',
            padding: '10px 0',
            background: 'transparent',
            color: '#999',
            border: '1px solid #eee',
            borderRadius: 12,
            fontSize: 13,
            fontWeight: 500,
            cursor: 'pointer',
            marginTop: 10,
            transition: 'all 0.15s',
          }}
          onMouseEnter={e => {
            (e.target as HTMLElement).style.background = '#f5f5f5';
            (e.target as HTMLElement).style.color = '#666';
            (e.target as HTMLElement).style.borderColor = '#ddd';
          }}
          onMouseLeave={e => {
            (e.target as HTMLElement).style.background = 'transparent';
            (e.target as HTMLElement).style.color = '#999';
            (e.target as HTMLElement).style.borderColor = '#eee';
          }}
        >
          <span style={{ fontSize: 14 }}>✔</span> Already Joined
        </button>
      </div>
    </div>
  );
}
