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
      `}</style>

      <div class="league-header">
        <h2>{data?.title || 'All Football Events'}</h2>
        <div class="league-tabs">
          <button class={`league-tab ${tab === 'football' ? 'active' : ''}`} onClick={() => setTab('football')}>Football</button>
          <button class={`league-tab ${tab === 'cricket' ? 'active' : ''}`} onClick={() => setTab('cricket')}>Cricket</button>
        </div>
      </div>

      <div class="league-list">
        {data?.matches.map((m, i) => (
          <a key={i} href={m.link} target="_blank" rel="noopener noreferrer" class="league-item">
            <img src={m.image} alt={m.name} loading="lazy" />
            <span>{m.name}</span>
            <span class="arrow">→</span>
          </a>
        ))}
      </div>
    </div>
  );
}
