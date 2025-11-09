import React, { useEffect, useMemo, useState } from 'react';
import { apiGet, apiAdd } from './api.js';
import { downloadCsv } from './csv.js';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
ChartJS.register(ArcElement, Tooltip, Legend);

const categories = ['Food', 'Transport', 'Shopping', 'Bills', 'Health', 'Other'];

function monthStr(d = new Date()) {
  return new Date(d.getFullYear(), d.getMonth(), 1).toISOString().slice(0, 7);
}
function todayStr(d = new Date()) {
  return d.toISOString().slice(0, 10);
}

export default function App() {
  const [month, setMonth] = useState(monthStr());
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ amount: '', category: 'Food', date: todayStr(), note: '' });
  const [loading, setLoading] = useState(false);
  const [adding, setAdding] = useState(false);
  const [error, setError] = useState('');

  async function load() {
    setLoading(true);
    setError('');
    try {
      setItems(await apiGet());
    } catch (e) {
      setError('Could not load expenses. Please retry.');
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
  async function fetchAll() {
    setLoading(true);
    setError(null);
    try {
      const items = await apiGet();
      setItems(items);
    } catch (e) {
      setError("Could not load expenses. Please retry.");
      console.error(e);
    }
    setLoading(false);
  }
  fetchAll();
  }, []);

  function validate() {
    if (form.amount === '' || isNaN(Number(form.amount))) return 'Enter a valid amount';
    if (Number(form.amount) <= 0) return 'Amount must be greater than 0';
    if (!form.date) return 'Please pick a date';
    if (!categories.includes(form.category)) return 'Pick a category';
    return '';
  }

  async function onAdd(e) {
    e.preventDefault();
    const v = validate();
    if (v) {
      setError(v);
      return;
    }
    setError('');
    try {
      setAdding(true);
      await apiAdd({
        amount: Number(form.amount),
        category: form.category,
        date: form.date,
        note: form.note,
      });
      setForm({ ...form, amount: '', note: '' });
      await load();
    } catch (e) {
      console.error(e);
      setError('Could not add expense. Try again.');
    } finally {
      setAdding(false);
    }
  }

  const total = useMemo(() => items.reduce((s, x) => s + Number(x.amount || 0), 0), [items]);
  const byCat = useMemo(() => {
    const map = Object.fromEntries(categories.map(c => [c, 0]));
    items.forEach(x => {
      map[x.category] = (map[x.category] || 0) + Number(x.amount || 0);
    });
    return map;
  }, [items]);

  const pieData = {
    labels: Object.keys(byCat),
    datasets: [
      {
        data: Object.values(byCat),
        backgroundColor: ['#4f46e5', '#16a34a', '#ef4444', '#f59e0b', '#22d3ee', '#a855f7'],
      },
    ],
  };

  return (
    <div className="container">
      <div className="card">
        <h1>Cloud Expense Tracker (Mini)</h1>
        <div className="subtitle">
          Add expenses, see monthly totals, and a simple category chart. Deployed on Azure.
        </div>

        <div className="row" style={{ marginBottom: '.75rem' }}>
          <div>
            <label>Month</label>
            <input type="month" value={month} onChange={e => setMonth(e.target.value)} />
          </div>
          <button className="secondary" onClick={() => downloadCsv(items)}>
            Export CSV
          </button>
          <div className="kpi">Total: ₹ {total.toFixed(2)}</div>
        </div>

        <form onSubmit={onAdd} className="row" style={{ alignItems: 'end', marginTop: '.5rem' }}>
          <div className="grow">
            <label>Amount</label>
            <input
              required
              type="number"
              step="0.01"
              min="0.01"
              placeholder="0.00"
              value={form.amount}
              onChange={e => setForm({ ...form, amount: e.target.value })}
            />
          </div>
          <div>
            <label>Category</label>
            <select
              value={form.category}
              onChange={e => setForm({ ...form, category: e.target.value })}
            >
              {categories.map(c => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label>Date</label>
            <input
              required
              type="date"
              value={form.date}
              onChange={e => setForm({ ...form, date: e.target.value })}
            />
          </div>
          <div className="grow">
            <label>Note</label>
            <input
              type="text"
              placeholder="optional"
              value={form.note}
              onChange={e => setForm({ ...form, note: e.target.value })}
            />
          </div>
          <div>
            <label>&nbsp;</label>
            <button type="submit" disabled={adding}>
              {adding ? 'Adding…' : 'Add'}
            </button>
          </div>
        </form>

        {error && (
          <div className="error" style={{ marginTop: '.6rem' }}>
            {error}
          </div>
        )}
        {loading && <div className="footer-note">Loading…</div>}

        <h3 style={{ marginTop: '1.25rem' }}>Category Breakdown</h3>
        <div style={{ maxWidth: 420 }}>
          <Pie data={pieData} />
        </div>

        <h3 style={{ marginTop: '1.25rem' }}>Expenses</h3>
        <table className="table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Category</th>
              <th>Amount</th>
              <th>Note</th>
            </tr>
          </thead>
          <tbody>
            {items.map(x => (
              <tr key={x._id}>
                <td>{x.date}</td>
                <td>{x.category}</td>
                <td>₹ {Number(x.amount).toFixed(2)}</td>
                <td>{x.note || ''}</td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr>
                <td colSpan="4" style={{ color: '#96a0b5' }}>
                  No expenses yet
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="footer-note">
          Tip: Use the Month selector to switch months; use Export CSV to download your data.
        </div>
      </div>
    </div>
  );
}
