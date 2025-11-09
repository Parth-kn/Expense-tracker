// src/csv.js

// Turn an array of objects into CSV text
export function toCsv(rows) {
  if (!rows || rows.length === 0) return '';
  const headers = Object.keys(rows[0]);

  // Escape double quotes by doubling them inside quoted cells
  const escape = s => `"${String(s).replace(/"/g, '""')}"`;

  const lines = [
    headers.join(','),
    ...rows.map(r => headers.map(h => escape(r[h] ?? '')).join(','))
  ];

  return lines.join('\n');
}

// Download a CSV file created from rows.
// Remove internal fields without triggering ESLint unused-vars
export function downloadCsv(rows, filename = 'expenses.csv') {
  const cleansed = rows.map(row => {
    const rest = { ...row };
    delete rest._id;
    delete rest.userId;
    delete rest.createdAt;
    delete rest.updatedAt;
    return rest;
  });

  const csv = toCsv(cleansed);
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();

  URL.revokeObjectURL(url);
}