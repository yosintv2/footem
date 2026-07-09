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


export default function Sidebar() {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    fetch(config.api.articles)
      .then(r => r.json())
      .then(setArticles)
      .catch(() => {});
  }, []);

  const resolvePath = (path: string) => config.base ? config.base + path : path;
  const articleList = articles.slice(0, config.sidebar.articleLimit);

  return (
    <aside className="sidebar">
      <style>{`
        .sidebar {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }
        .sidebar-widget {
          background: #1a1a1a;
          border: 1px solid #2a2a2a;
          border-radius: 6px;
          overflow: hidden;
        }
        .sidebar-widget-title {
          padding: 8px 14px;
          font-size: 14px;
          font-weight: 700;
          color: #e0e0e0;
          text-transform: uppercase;
          letter-spacing: 0.3px;
          border-bottom: 2px solid #ff0037;
          background: #1a1a1a;
        }
        .sidebar-widget-body {
          padding: 8px;
        }
        .sidebar-post-item {
          display: flex;
          gap: 10px;
          padding: 10px 8px;
          border-bottom: 1px solid #2a2a2a;
          text-decoration: none;
          transition: all 0.15s;
        }
        .sidebar-post-item:last-child {
          border-bottom: none;
        }
        .sidebar-post-item:hover {
          background: #222;
        }
        .sidebar-post-content {
          flex: 1;
          min-width: 0;
        }
        .sidebar-post-title {
          font-size: 12px;
          font-weight: 600;
          color: #e0e0e0;
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
          color: #888;
        }
      `}</style>

      <div className="sidebar-widget">
        <div className="sidebar-widget-title">{config.sidebar.widgetTitle}</div>
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
