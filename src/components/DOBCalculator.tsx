import { useState, useEffect, useCallback } from 'react';

interface Age {
  years: number;
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function calcAge(dob: Date): Age {
  const now = new Date();
  let diff = now.getTime() - dob.getTime();
  if (diff < 0) diff = 0;
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const years = Math.floor(days / 365.25);
  const remainingAfterYears = days - Math.floor(years * 365.25);
  let months = 0;
  let d = new Date(dob);
  while (d < now) {
    d.setMonth(d.getMonth() + 1);
    if (d <= now) months++;
  }
  const monthStart = new Date(dob);
  monthStart.setMonth(monthStart.getMonth() + months);
  const dayDiff = Math.floor((now.getTime() - monthStart.getTime()) / (1000 * 60 * 60 * 24));
  return {
    years,
    months,
    days: Math.max(0, dayDiff),
    hours: hours % 24,
    minutes: minutes % 60,
    seconds: seconds % 60,
  };
}

function daysUntilNextBirthday(dob: Date): number {
  const now = new Date();
  const next = new Date(now.getFullYear(), dob.getMonth(), dob.getDate());
  if (next <= now) next.setFullYear(next.getFullYear() + 1);
  return Math.ceil((next.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
}

function getZodiac(dob: Date): string {
  const d = dob.getDate();
  const m = dob.getMonth() + 1;
  if ((m === 3 && d >= 21) || (m === 4 && d <= 19)) return 'Aries';
  if ((m === 4 && d >= 20) || (m === 5 && d <= 20)) return 'Taurus';
  if ((m === 5 && d >= 21) || (m === 6 && d <= 20)) return 'Gemini';
  if ((m === 6 && d >= 21) || (m === 7 && d <= 22)) return 'Cancer';
  if ((m === 7 && d >= 23) || (m === 8 && d <= 22)) return 'Leo';
  if ((m === 8 && d >= 23) || (m === 9 && d <= 22)) return 'Virgo';
  if ((m === 9 && d >= 23) || (m === 10 && d <= 22)) return 'Libra';
  if ((m === 10 && d >= 23) || (m === 11 && d <= 21)) return 'Scorpio';
  if ((m === 11 && d >= 22) || (m === 12 && d <= 21)) return 'Sagittarius';
  if ((m === 12 && d >= 22) || (m === 1 && d <= 19)) return 'Capricorn';
  if ((m === 1 && d >= 20) || (m === 2 && d <= 18)) return 'Aquarius';
  return 'Pisces';
}

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

function formatDate(d: Date): string {
  return `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
}

export default function DOBCalculator() {
  const [dobStr, setDobStr] = useState('');
  const [dob, setDob] = useState<Date | null>(null);
  const [age, setAge] = useState<Age | null>(null);
  const [daysToBirthday, setDaysToBirthday] = useState<number | null>(null);
  const [zodiac, setZodiac] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const update = useCallback((d: Date) => {
    setAge(calcAge(d));
    setDaysToBirthday(daysUntilNextBirthday(d));
    setZodiac(getZodiac(d));
  }, []);

  useEffect(() => {
    if (!dob) return;
    const timer = setInterval(() => update(dob), 1000);
    return () => clearInterval(timer);
  }, [dob, update]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!dobStr) { setError('Please select your date of birth.'); return; }
    const d = new Date(dobStr);
    if (isNaN(d.getTime())) { setError('Invalid date.'); return; }
    if (d > new Date()) { setError('Date of birth cannot be in the future.'); return; }
    setError('');
    setSubmitted(true);
    setDob(d);
    update(d);
  };

  const handleReset = () => {
    setDobStr('');
    setDob(null);
    setAge(null);
    setDaysToBirthday(null);
    setZodiac(null);
    setSubmitted(false);
    setError('');
  };

  return (
    <div style={{ maxWidth: 560, margin: '0 auto', fontFamily: 'Inter, sans-serif' }}>
      <style>{`
        .dob-card {
          background: #fff;
          border: 1px solid #e0e0e0;
          border-radius: 16px;
          padding: 32px;
          box-shadow: 0 4px 24px rgba(0,0,0,0.06);
        }
        .dob-card h2 {
          font-size: 24px;
          font-weight: 800;
          color: #222;
          margin-bottom: 8px;
        }
        .dob-card p.sub {
          color: #888;
          font-size: 14px;
          margin-bottom: 24px;
        }
        .dob-form { display: flex; gap: 12px; flex-wrap: wrap; }
        .dob-form input {
          flex: 1;
          min-width: 200px;
          padding: 12px 16px;
          border: 2px solid #e0e0e0;
          border-radius: 10px;
          font-size: 16px;
          font-family: inherit;
          outline: none;
          transition: border-color 0.2s;
        }
        .dob-form input:focus { border-color: #ff0037; }
        .dob-form button {
          padding: 12px 28px;
          background: #ff0037;
          color: #fff;
          border: none;
          border-radius: 10px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s;
        }
        .dob-form button:hover { background: #e0002f; }
        .dob-form button.reset {
          background: #f5f5f5;
          color: #555;
        }
        .dob-form button.reset:hover { background: #e8e8e8; }
        .error { color: #ff0037; font-size: 14px; margin-top: 8px; }
        .age-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
          margin-top: 28px;
        }
        .age-item {
          background: #f9f9f9;
          border-radius: 12px;
          padding: 16px 8px;
          text-align: center;
        }
        .age-value {
          font-size: 28px;
          font-weight: 800;
          color: #ff0037;
          line-height: 1.2;
        }
        .age-label {
          font-size: 12px;
          color: #888;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-top: 4px;
        }
        .live-age {
          background: linear-gradient(135deg, #fff5f7, #fff);
          border: 1px solid #ffe0e6;
          border-radius: 12px;
          padding: 20px;
          margin-top: 20px;
          text-align: center;
        }
        .live-age .value {
          font-size: 22px;
          font-weight: 800;
          color: #ff0037;
          font-variant-numeric: tabular-nums;
        }
        .live-age .label {
          font-size: 13px;
          color: #888;
          margin-top: 4px;
        }
        .meta {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          margin-top: 16px;
        }
        .meta-item {
          background: #f9f9f9;
          border-radius: 12px;
          padding: 16px;
          text-align: center;
        }
        .meta-item .value {
          font-size: 18px;
          font-weight: 700;
          color: #222;
        }
        .meta-item .label {
          font-size: 12px;
          color: #888;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-top: 4px;
        }
        .birthday-badge {
          margin-top: 20px;
          background: #fff5f7;
          border: 1px solid #ffe0e6;
          border-radius: 12px;
          padding: 16px;
          text-align: center;
          font-size: 15px;
          color: #555;
        }
        .birthday-badge strong { color: #ff0037; }
        @media (max-width: 480px) {
          .dob-card { padding: 20px; }
          .age-grid { grid-template-columns: repeat(3, 1fr); gap: 8px; }
          .age-value { font-size: 22px; }
          .meta { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="dob-card">
        <h2>Date of Birth Calculator</h2>
        <p className="sub">Find out your exact age and upcoming birthday details.</p>

        {!submitted ? (
          <form className="dob-form" onSubmit={handleSubmit}>
            <input
              type="date"
              value={dobStr}
              onChange={(e) => setDobStr(e.target.value)}
              max={new Date().toISOString().split('T')[0]}
            />
            <button type="submit">Calculate</button>
            {error && <div className="error">{error}</div>}
          </form>
        ) : (
          <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
              <span style={{ color: '#888', fontSize: 14 }}>Born: <strong style={{ color: '#222' }}>{dob && formatDate(dob)}</strong></span>
              <button className="reset" onClick={handleReset} style={{
                padding: '6px 16px',
                background: '#f5f5f5',
                color: '#555',
                border: 'none',
                borderRadius: 8,
                fontSize: 13,
                cursor: 'pointer',
              }}>Change</button>
            </div>

            <div className="age-grid">
              <div className="age-item">
                <div className="age-value">{age?.years ?? 0}</div>
                <div className="age-label">Years</div>
              </div>
              <div className="age-item">
                <div className="age-value">{age?.months ?? 0}</div>
                <div className="age-label">Months</div>
              </div>
              <div className="age-item">
                <div className="age-value">{age?.days ?? 0}</div>
                <div className="age-label">Days</div>
              </div>
            </div>

            <div className="live-age">
              <div className="value">
                {String(age?.hours ?? 0).padStart(2, '0')}:
                {String(age?.minutes ?? 0).padStart(2, '0')}:
                {String(age?.seconds ?? 0).padStart(2, '0')}
              </div>
              <div className="label">Hours : Minutes : Seconds</div>
            </div>

            <div className="meta">
              {daysToBirthday !== null && (
                <div className="meta-item">
                  <div className="value">{daysToBirthday}</div>
                  <div className="label">Days Until Birthday</div>
                </div>
              )}
              {zodiac && (
                <div className="meta-item">
                  <div className="value">{zodiac}</div>
                  <div className="label">Zodiac Sign</div>
                </div>
              )}
            </div>

            {daysToBirthday === 0 && (
              <div className="birthday-badge">🎂 Happy Birthday! Wishing you a fantastic day!</div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
