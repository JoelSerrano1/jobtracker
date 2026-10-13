import { useState } from 'react';
import { createApplication } from '../api.js';

const BLANK = { company: '', role: '', url: '', status: 'looking', notes: '' };

export default function ApplicationForm({ onSaved }) {
  const [form, setForm] = useState(BLANK);
  const [error, setError] = useState('');

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await createApplication(form);
      setForm(BLANK);
      onSaved();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form className="card" onSubmit={submit}>
      <div className="row">
        <input type="text" placeholder="Company *" required value={form.company} onChange={set('company')} />
        <input type="text" placeholder="Role *" required value={form.role} onChange={set('role')} />
      </div>
      <div className="row">
        <input type="url" placeholder="Posting URL" value={form.url} onChange={set('url')} />
        <input type="text" placeholder="Notes" value={form.notes} onChange={set('notes')} />
      </div>
      {error && <p className="error">{error}</p>}
      <button type="submit">Add application</button>
    </form>
  );
}