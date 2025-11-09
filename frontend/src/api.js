const BASE_URL = 'https://icy-moss-06a874e00.3.azurestaticapps.net/api';

export async function apiGet(month) {
  const url = month
    ? `${BASE_URL}/GetExpenses?month=${encodeURIComponent(month)}`
    : `${BASE_URL}/GetExpenses`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch');
  return res.json();
}

export async function apiAdd(expense) {
  const res = await fetch(`${BASE_URL}/AddExpense`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(expense),
  });
  if (!res.ok) throw new Error('Failed to add');
  return res.json();
}
