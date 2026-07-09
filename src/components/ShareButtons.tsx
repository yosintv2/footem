import { useState } from 'react';

interface Props {
  title: string;
  url?: string;
}

export default function ShareButtons({ title, url }: Props) {
  const [copied, setCopied] = useState(false);
  const pageUrl = url || (typeof window !== 'undefined' ? window.location.href : '');
  const encodedUrl = encodeURIComponent(pageUrl);
  const encodedTitle = encodeURIComponent(title);

  const encodedText = `${encodedTitle}%20${encodedUrl}`;

  const shareLinks = [
    {
      name: 'Facebook',
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      color: '#1877F2',
      svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>',
    },
    {
      name: 'Twitter',
      href: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
      color: '#000',
      svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>',
    },
    {
      name: 'WhatsApp',
      href: `https://wa.me/?text=${encodedText}`,
      color: '#25D366',
      svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>',
    },
    {
      name: 'Viber',
      href: `viber://forward?text=${encodedText}`,
      color: '#665CAC',
      svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M11.4 0C5.1.02 0 5.12 0 11.41c0 2.5.85 4.89 2.41 6.86L1 23l4.95-1.29c1.74.91 3.7 1.45 5.77 1.45 6.29 0 11.39-5.13 11.39-11.43C23.12 5.08 17.97 0 11.4 0zm5.23 15.7c-.31.54-.78.85-1.36.85-.16 0-.34-.02-.53-.07-.66-.16-1.32-.48-1.99-.95-1.17-.74-2.18-1.72-3.01-2.94-.5-.74-.79-1.38-.86-1.95-.07-.56.07-1.04.42-1.38.2-.19.41-.28.63-.28.08 0 .17.01.26.04.12.04.25.16.4.4.15.26.36.65.48.94.08.22.14.41.16.55.03.19-.01.35-.11.49-.06.08-.13.16-.21.23-.08.08-.16.14-.2.19-.01.02-.04.04-.05.06-.04.07-.06.14-.03.23.03.07.11.22.23.39.16.24.37.47.6.7.51.49 1.06.83 1.62 1.02.17.06.31.07.42.04.12-.03.22-.11.3-.23.06-.08.11-.17.16-.27l.05-.11c.05-.11.11-.21.18-.31.11-.13.25-.2.43-.2.1 0 .2.02.3.05.32.1.97.42 1.28.59.17.09.3.18.39.26.11.12.17.28.14.46-.05.21-.14.42-.27.61z"/></svg>',
    },
    {
      name: 'Messenger',
      href: `fb-messenger://share?link=${encodedUrl}`,
      color: '#0084FF',
      svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12 0C5.373 0 0 4.975 0 11.111c0 3.497 1.745 6.616 4.472 8.652V24l4.086-2.242c1.09.301 2.246.464 3.442.464 6.627 0 12-4.974 12-11.111C24 4.975 18.627 0 12 0zm-1.2 14.971l-2.84-3.108L3.62 14.97l5.39-5.48 2.9 3.108 4.36-3.108-5.47 5.48z"/></svg>',
    },
    {
      name: 'Instagram',
      href: `https://www.instagram.com/`,
      color: '#E4405F',
      svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>',
    },
  ];

  function handleCopy() {
    navigator.clipboard.writeText(pageUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <div className="share-wrap">
      <style>{`
        .share-wrap { display: flex; align-items: center; justify-content: center; gap: 6px; flex-wrap: wrap; }
        .share-label { font-size: 12px; font-weight: 700; color: #888; margin-right: 2px; white-space: nowrap; }
        .share-btn {
          display: inline-flex; align-items: center; justify-content: center;
          width: 32px; height: 32px; border-radius: 50%; border: none;
          cursor: pointer; transition: transform 0.15s, opacity 0.15s;
          color: #fff; text-decoration: none;
        }
        .share-btn:hover { transform: scale(1.1); opacity: 0.9; }
        .share-btn-copy {
          background: #666; font-size: 10px; font-weight: 700;
        }
        .share-btn-copy.copied { background: #22c55e; }
        @media (min-width: 640px) {
          .share-btn { width: 36px; height: 36px; }
        }
        @media (max-width: 480px) {
          .share-label { display: none; }
          .share-btn { width: 28px; height: 28px; }
          .share-wrap { gap: 4px; }
        }
      `}</style>
      <span className="share-label">Share:</span>
      {shareLinks.map(s => (
        <a
          key={s.name}
          href={s.href}

          className="share-btn"
          style={{ background: s.color }}
          title={`Share on ${s.name}`}
          dangerouslySetInnerHTML={{ __html: s.svg }}
        />
      ))}
      <button
        className={`share-btn share-btn-copy ${copied ? 'copied' : ''}`}
        onClick={handleCopy}
        title={copied ? 'Copied!' : 'Copy link'}
      >
        {copied ? '✓' : '🔗'}
      </button>
    </div>
  );
}
