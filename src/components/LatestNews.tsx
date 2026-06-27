import { useState, useEffect } from 'react';
import { config } from '../config';

const resolvePath = (path: string) => config.base ? config.base + path : path;

interface Article {
  slug: string;
  title: string;
  snippet: string;
  publishedAt: string;
  author: string;
  labels: string[];
}

export default function LatestNews() {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    fetch(config.api.articles)
      .then(r => r.json())
      .then(setArticles)
      .catch(() => {});
  }, []);

  return (
    <div class="ln-wrap">
      <style>{`
        .ln-wrap {
          background: #fff;
          border: 1px solid #e0e0e0;
          border-radius: 8px;
          overflow: hidden;
          margin-bottom: 40px;
        }
        .ln-header {
          padding: 24px 32px 0;
        }
        .ln-header h1 {
          font-size: 28px;
          font-weight: 800;
          color: #222;
          margin-bottom: 16px;
        }
        .ln-meta {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 20px;
          color: #888;
          font-size: 14px;
          padding-bottom: 20px;
          border-bottom: 1px solid #e0e0e0;
        }
        .ln-meta span {
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .ln-item {
          padding: 16px 32px;
          border-bottom: 1px solid #eee;
          transition: background 0.15s;
          display: block;
          text-decoration: none;
          color: inherit;
        }
        .ln-item:last-child {
          border-bottom: none;
        }
        .ln-item:hover {
          background: #fafafa;
        }
        .ln-label {
          display: inline-block;
          background: #ff0037;
          color: #fff;
          padding: 2px 10px;
          border-radius: 3px;
          font-size: 10px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.3px;
          margin-bottom: 6px;
        }
        .ln-title {
          font-size: 16px;
          font-weight: 600;
          color: #333;
          line-height: 1.4;
          margin-bottom: 4px;
        }
        .ln-item:hover .ln-title {
          color: #ff0037;
        }
        .ln-snippet {
          font-size: 14px;
          color: #777;
          line-height: 1.5;
          margin-bottom: 6px;
        }
        .ln-meta-bottom {
          font-size: 12px;
          color: #999;
        }
        .ln-meta-bottom span {
          margin-right: 12px;
        }
        @media (max-width: 768px) {
          .ln-header { padding: 20px 20px 0; }
          .ln-item { padding: 14px 20px; }
        }
      `}</style>

      <div class="ln-header">
        <h1>Latest News</h1>
        <div class="ln-meta">
          <span>📅 {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
          <span>👤 YoSinTV Staff</span>
          <span>{articles.length} articles</span>
        </div>
      </div>

      {articles.map((article) => (
          <a key={article.slug} href={resolvePath(`/story/${article.slug}`)} class="ln-item">
          {article.labels?.[0] && <span class="ln-label">{article.labels[0]}</span>}
          <div class="ln-title">{article.title}</div>
          <div class="ln-snippet">{article.snippet}</div>
          <div class="ln-meta-bottom">
            <span>{article.author}</span>
            <span>{article.publishedAt}</span>
          </div>
        </a>
      ))}
    </div>
  );
}
