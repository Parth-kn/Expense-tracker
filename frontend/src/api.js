export async function apiGet(month) {
  const url = month
    ? 'http://localhost:7071/api/GetExpenses?month=' + month
    : 'http://localhost:7071/api/GetExpenses';
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch');
  return res.json();
}

export async function apiAdd(expense) {
  const res = await fetch('http://localhost:7071/api/AddExpense', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(expense),
  });
  if (!res.ok) throw new Error('Failed to add');
  return res.json();
}
