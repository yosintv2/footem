import { useState, useEffect } from 'react';
import { config } from '../config';

interface Article {
  slug: string;
  title: string;
  snippet: string;
  publishedAt: string;
  author: string;
  labels: string[];
}

const SVGDownload = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" width="1em" height="1em" fill="currentColor"><path d="M505.7 661a8 8 0 0012.6 0l112-141.7c4.1-5.2.4-12.9-6.3-12.9h-74.1V168c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8v338.3H400c-6.7 0-10.4 7.7-6.3 12.9l112 141.8zM878 626h-60c-4.4 0-8 3.6-8 8v154H214V634c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8v198c0 17.7 14.3 32 32 32h684c17.7 0 32-14.3 32-32V634c0-4.4-3.6-8-8-8z"/></svg>';
const SVGSend = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" width="1em" height="1em" fill="currentColor"><path d="M931.4 498.9L94.9 79.5c-3.4-1.7-7.3-2.1-11-1.2-8.5 2.1-13.8 10.7-11.7 19.3l86.2 352.2c1.3 5.3 5.2 9.6 10.4 11.3l147.7 50.7-147.6 50.7c-5.2 1.8-9.1 6-10.3 11.3L72.2 926.5c-2.2 8.6 3.1 17.2 11.7 19.3 1.3.3 2.6.5 3.9.5 3.2 0 6.4-1 9.1-2.8l836.5-419.4c3.3-1.6 5.6-5 5.6-8.7s-2.3-7.1-5.6-8.7zM170.8 826.3l50.3-205.6 295.2-101.3c2.3-.8 4.2-2.6 5-5 1.4-4.2-.8-8.7-5-10.2L221.1 403.3 170.8 197.7l618.4 310.2-618.4 318.4z"/></svg>';

export default function Sidebar() {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    fetch(config.api.articles)
      .then(r => r.json())
      .then(setArticles)
      .catch(() => {});
  }, []);

  useEffect(() => {
    try {
      ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
    } catch {}
  }, []);

  const resolvePath = (path: string) => config.base ? config.base + path : path;
  const apkUrl = config.links.apk;
  const telegramUrl = config.links.social.telegram;
  const adClient = config.ads.google.client;
  const adSlot = config.ads.google.slots.sidebar300x250;
  const articleList = articles.slice(0, 6);

  return (
    <aside className="sidebar">
      <style>{`
        .sidebar {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }
        .sidebar-widget {
          background: #fff;
          border: 1px solid #e0e0e0;
          border-radius: 6px;
          overflow: hidden;
        }
        .sidebar-widget-title {
          padding: 12px 14px;
          font-size: 14px;
          font-weight: 700;
          color: #333;
          text-transform: uppercase;
          letter-spacing: 0.3px;
          border-bottom: 2px solid #ff0037;
          background: #fafafa;
        }
        .sidebar-widget-body {
          padding: 8px;
        }
        .sidebar-post-item {
          display: flex;
          gap: 10px;
          padding: 10px 8px;
          border-bottom: 1px solid #eee;
          text-decoration: none;
          transition: all 0.15s;
        }
        .sidebar-post-item:last-child {
          border-bottom: none;
        }
        .sidebar-post-item:hover {
          background: #fafafa;
        }
        .sidebar-post-content {
          flex: 1;
          min-width: 0;
        }
        .sidebar-post-title {
          font-size: 12px;
          font-weight: 600;
          color: #444;
          line-height: 1.35;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          margin-bottom: 3px;
          transition: color 0.15s;
        }
        .sidebar-post-item:hover .sidebar-post-title {
          color: #ff0037;
        }
        .sidebar-post-date {
          font-size: 10px;
          color: #999;
        }
        .sidebar-cta {
          padding: 20px 14px;
          text-align: center;
        }
        .sidebar-cta-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          width: 100%;
          padding: 10px;
          border-radius: 6px;
          font-weight: 700;
          font-size: 13px;
          border: none;
          cursor: pointer;
          transition: all 0.2s;
          margin-bottom: 8px;
          text-decoration: none;
        }
        .sidebar-cta-btn:last-child {
          margin-bottom: 0;
        }
        .sidebar-cta-btn.apk {
          background: linear-gradient(135deg, #ff0037, #ff6b35);
          color: #fff;
        }
        .sidebar-cta-btn.apk:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 16px rgba(255,0,55,0.25);
        }
        .sidebar-cta-btn.telegram {
          background: #0088cc;
          color: #fff;
        }
        .sidebar-cta-btn.telegram:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 16px rgba(0,136,204,0.25);
        }
      `}</style>

      <div className="sidebar-widget">
        <div className="sidebar-cta">
          <a className="sidebar-cta-btn apk" href={apkUrl} target="_blank" rel="noopener noreferrer">
            Download APK
          </a>
          <a className="sidebar-cta-btn telegram" href={telegramUrl} target="_blank" rel="noopener noreferrer">
            Join Telegram
          </a>
        </div>
      </div>

      <div className="sidebar-widget" style={{ padding: 0, textAlign: 'center', background: '#fff' }}>
        <ins className="adsbygoogle"
             style={{ display: 'inline-block', width: 300, height: 250, background: 'transparent' }}
             data-ad-client={adClient}
             data-ad-slot={adSlot}></ins>
      </div>

      <div className="sidebar-widget">
        <div className="sidebar-widget-title">Recent Posts</div>
        <div className="sidebar-widget-body">
          {articleList.map((a) => (
            <a key={a.slug} href={resolvePath(`/story/${a.slug}`)} className="sidebar-post-item">
              <div className="sidebar-post-content">
                <div className="sidebar-post-title">{a.title}</div>
                <div className="sidebar-post-date">{a.publishedAt}</div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </aside>
  );
}
