import { STATUSES, STATUS_LABEL } from '../App.jsx';
import { deleteApplication, updateApplication } from '../api.js';

export default function ApplicationList({ items, onChange }) {
  if (items.length === 0) return <p className="empty">No applications yet — add the first one above.</p>;

  const advance = async (item) => {
    const idx = STATUSES.indexOf(item.status);
    const next = STATUSES[Math.min(idx + 1, STATUSES.length - 1)];
    await updateApplication(item.id, { status: next });
    onChange();
  };

  const remove = async (item) => {
    if (!window.confirm(`Delete ${item.company} — ${item.role}?`)) return;
    await deleteApplication(item.id);
    onChange();
  };

  return (
    <ul className="list">
      {items.map((item) => (
        <li key={item.id} className="card item">
          <div className="item-head">
            <strong>{item.company}</strong>
            <span className={`badge badge-${item.status}`}>{STATUS_LABEL(item.status)}</span>
          </div>
          <div className="item-role">{item.role}</div>
          {item.url ? (
            <a href={item.url} target="_blank" rel="noreferrer">
              View posting
            </a>
          ) : (
            <span className="muted">No URL</span>
          )}
          {item.notes && <p className="notes">{item.notes}</p>}
          <div className="item-actions">
            <button onClick={() => advance(item)}>Advance status</button>
            <button className="danger" onClick={() => remove(item)}>
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}