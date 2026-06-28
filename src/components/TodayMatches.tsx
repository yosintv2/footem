import { useState, useEffect } from 'react';
import { config } from '../config';

interface FootballData {
  event: {
    league: string;
    round: number;
    kick_off_time_utc: string;
    venue: string;
    stadium_capacity: number | null;
    referee: string;
    home_team: { name: string; id: number };
    away_team: { name: string; id: number };
    home_manager: string;
    away_manager: string;
  };
  h2h: { teamDuel: any | null; managerDuel: any | null };
  lineups: {
    home_formation: string;
    away_formation: string;
    home_players: string[];
    away_players: string[];
    home_missing_players: string[];
    away_missing_players: string[];
  };
  pregame_form: any | null;
}

interface Match {
  team1: string;
  team1_logo: string;
  team2: string;
  team2_logo: string;
  league_logo: string | null;
  league: string;
  start: string;
  duration: number;
  details_url: string;
  streaming_url: string;
  event_id: number;
  football_data?: FootballData;
}

function isToday(dateStr: string): boolean {
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return false;
  const now = new Date();
  return d.getFullYear() === now.getFullYear() &&
    d.getMonth() === now.getMonth() &&
    d.getDate() === now.getDate();
}

function generateExcerpt(m: Match): string {
  const fd = m.football_data;
  const venue = fd?.event?.venue || 'TBD';
  const referee = fd?.event?.referee || 'TBD';
  const homeForm = fd?.lineups?.home_formation || '';
  const awayForm = fd?.lineups?.away_formation || '';
  let text = `${m.team1} take on ${m.team2} at ${venue} in this ${m.league} fixture. `;
  text += `The match will be officiated by referee ${referee}.`;
  if (homeForm && awayForm) {
    text += ` Both sides are expected to field ${homeForm} and ${awayForm} formations respectively.`;
  }
  return text;
}

export default function TodayMatches() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(config.api.football)
      .then(r => r.json())
      .then(data => {
        const raw: Match[] = data.matches || data || [];
        const today = raw.filter(m => isToday(m.start || m.match_time || ''));
        today.sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime());
        setMatches(today);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const todayStr = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });

  return (
    <div class="tm-content">
      <style>{`
        .tm-header { padding: 28px 0 16px; }
        .tm-header h1 { font-size: 28px; font-weight: 800; color: #222; margin-bottom: 6px; }
        .tm-header p { font-size: 14px; color: #888; }
        .tm-count { font-size: 14px; color: #ff0037; font-weight: 600; margin-bottom: 20px; }
        .tm-loading { text-align: center; padding: 60px 0; color: #888; font-size: 15px; }

        .tm-post {
          padding: 24px 0;
          border-bottom: 1px solid #e8e8e8;
        }
        .tm-post:first-of-type { padding-top: 0; }
        .tm-post:last-child { border-bottom: none; }
        .tm-post-title {
          font-size: 20px; font-weight: 700; color: #222;
          line-height: 1.35; margin-bottom: 8px;
        }
        .tm-post-title a {
          color: #222; text-decoration: none; transition: color 0.2s;
        }
        .tm-post-title a:hover { color: #ff0037; }
        .tm-post-meta {
          font-size: 13px; color: #999; margin-bottom: 10px;
        }
        .tm-post-meta span { margin-right: 16px; }
        .tm-post-excerpt {
          font-size: 15px; line-height: 1.7; color: #555;
          margin-bottom: 14px;
        }
        .tm-post-readmore {
          display: inline-block;
          background: #ff0037; color: #fff;
          padding: 8px 20px; border-radius: 6px;
          font-size: 13px; font-weight: 700; text-decoration: none;
          transition: opacity 0.2s;
        }
        .tm-post-readmore:hover { opacity: 0.9; }

        .tm-empty {
          text-align: center; padding: 80px 0; color: #888;
        }
        .tm-empty h2 { font-size: 22px; color: #222; margin-bottom: 8px; }
        .tm-empty p { font-size: 14px; }
      `}</style>

      <div class="tm-header">
        <h1>Today's Matches in YoSinTV</h1>
        <p>{todayStr}</p>
      </div>

      {loading && <div class="tm-loading">Loading today's matches...</div>}

      {!loading && matches.length > 0 && (
        <div class="tm-count">{matches.length} match{matches.length !== 1 ? 'es' : ''} happening today</div>
      )}

      {!loading && matches.length === 0 && (
        <div class="tm-empty">
          <h2>No matches today</h2>
          <p>Check back tomorrow for more football action.</p>
        </div>
      )}

      {!loading && matches.map(m => (
        <article class="tm-post" key={m.event_id}>
          <h2 class="tm-post-title">
            <a href={`/match/${m.event_id}`}>
              {m.team1} vs {m.team2} Match Preview: {m.league}
            </a>
          </h2>
          <div class="tm-post-meta">
            <span>{m.league}</span>
            <span>{new Date(m.start).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
            <span>{new Date(m.start).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}</span>
          </div>
          <div class="tm-post-excerpt">{generateExcerpt(m)}</div>
          <a href={`/match/${m.event_id}`} class="tm-post-readmore">Read more →</a>
        </article>
      ))}
    </div>
  );
}
