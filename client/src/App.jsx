import { useEffect, useState } from 'react';
import { listApplications } from './api.js';
import ApplicationForm from './components/ApplicationForm.jsx';
import ApplicationList from './components/ApplicationList.jsx';

export const STATUSES = ['looking', 'applied', 'interview', 'offer', 'rejected'];

export function STATUS_LABEL(status) {
  return {
    looking: 'Looking',
    applied: 'Applied',
    interview: 'Interview',
    offer: 'Offer',
    rejected: 'Rejected',
  }[status] ?? status;
}

export default function App() {
  const [items, setItems] = useState([]);
  const [statusFilter, setStatusFilter] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await listApplications(statusFilter || undefined);
      setItems(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [statusFilter]);

  return (
    <div className="container">
      <header>
        <h1>JobTracker</h1>
        <p className="sub">Track your applications, one row at a time.</p>
      </header>

      {error && <p className="error">Error: {error}</p>}

      <ApplicationForm onSaved={load} />

      <div className="filters">
        <label>
          Filter by status:
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="">All</option>
            {STATUSES.map((s) => (
              <option key={s} value={s}>
                {STATUS_LABEL(s)}
              </option>
            ))}
          </select>
        </label>
      </div>

      {loading ? <p>Loading…</p> : <ApplicationList items={items} onChange={load} />}
    </div>
  );
}