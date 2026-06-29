import { useState, useEffect } from 'react';
import { config } from '../config';

interface Match {
  name: string;
  image: string;
  link: string;
}

interface LeagueData {
  title: string;
  matches: Match[];
}

export default function LeagueGrid() {
  const [tab, setTab] = useState<'football' | 'cricket'>('football');
  const [data, setData] = useState<LeagueData | null>(null);

  useEffect(() => {
    const url = tab === 'football'
      ? config.api.footballHomepage
      : config.api.cricketHomepage;
    fetch(url)
      .then(r => r.json())
      .then(setData)
      .catch(() => setData(null));
  }, [tab]);

  return (
    <div class="league-wrap">
      <style>{`
        .league-wrap {
          margin-bottom: 24px;
        }
        .league-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 16px;
        }
        .league-header h2 {
          font-size: 20px;
          font-weight: 800;
          color: #222;
        }
        .league-tabs {
          display: flex;
          gap: 6px;
          background: #f0f0f0;
          border-radius: 8px;
          padding: 3px;
        }
        .league-tab {
          padding: 6px 18px;
          border: none;
          border-radius: 6px;
          font-size: 13px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s;
          background: transparent;
          color: #666;
          text-transform: uppercase;
        }
        .league-tab.active {
          background: #ff0037;
          color: #fff;
        }
        .league-list {
          display: flex;
          flex-direction: column;
          border: 1px solid #e0e0e0;
          border-radius: 8px;
          overflow: hidden;
          background: #fff;
        }
        .league-item {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 12px 18px;
          border-bottom: 1px solid #eee;
          text-decoration: none;
          transition: all 0.15s;
        }
        .league-item:last-child {
          border-bottom: none;
        }
        .league-item:hover {
          background: #fafafa;
        }
        .league-item img {
          width: 28px;
          height: 28px;
          object-fit: contain;
          flex-shrink: 0;
        }
        .league-item span {
          font-size: 14px;
          color: #444;
          font-weight: 500;
        }
        .league-item:hover span {
          color: #ff0037;
        }
        .league-item .arrow {
          margin-left: auto;
          color: #bbb;
          font-size: 14px;
        }
        .league-apk-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 14px 20px;
          margin-bottom: 12px;
          background: linear-gradient(135deg, #ff0037, #ff6b35);
          color: #fff;
          font-weight: 700;
          font-size: 15px;
          border: none;
          border-radius: 10px;
          text-decoration: none;
          transition: all 0.2s;
          cursor: pointer;
        }
        .league-apk-btn:hover {
          opacity: 0.92;
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(255, 0, 55, 0.3);
          color: #fff;
        }
      `}</style>

      <div class="league-header">
        <h2>{data?.title || 'All Football Events'}</h2>
        <div class="league-tabs">
          <button class={`league-tab ${tab === 'football' ? 'active' : ''}`} onClick={() => setTab('football')}>Football</button>
          <button class={`league-tab ${tab === 'cricket' ? 'active' : ''}`} onClick={() => setTab('cricket')}>Cricket</button>
        </div>
      </div>

      <a href={config.links.apk} class="league-apk-btn">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
        Download YoSinTV APK
      </a>

      <div class="league-list">
        {data?.matches.map((m, i) => (
          <a key={i} href={m.link} class="league-item">
            <img src={m.image} alt={m.name} loading="lazy" />
            <span>{m.name}</span>
            <span class="arrow">→</span>
          </a>
        ))}
      </div>
    </div>
  );
}
