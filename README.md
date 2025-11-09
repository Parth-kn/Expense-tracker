<<<<<<< HEAD
# Cloud Expense Tracker (Mini Project)

A minimal, cloud-hosted expense tracker you can deploy and demo from anywhere.

## Features
- Add expense (amount, category, date, note)
- List expenses with monthly total
- Category pie chart
- Export CSV and upload it somewhere ne

## Stack
- **Frontend:** React + Vite
- **Backend:** Azure Functions (Node.js)
- **Database:** Azure Cosmos DB (Mongo API)
- **Hosting + CI/CD:** Azure Static Web Apps

## Quick Start
1. Install Node.js LTS and Azure Functions Core Tools (optional for local API testing).
2. In `frontend/`: `npm install && npm run dev`
3. In `api/`: put your Cosmos Mongo connection string into `local.settings.json` and run `func start`.
4. For cloud deployment, see `DEPLOYMENT.md`.

## Notes
- For mini project simplicity, authentication is optional. The API uses a default `userId = 'demo'` when no auth header is present.
- To simulate multiple users during testing, pass `?userId=alice` to GET and POST requests.

=======
# Expense-tracker
A cloud-based expense tracker using React, Azure Functions, MongoDB
>>>>>>> fb3ef63c3a4fbb831264214e8bbac03a0345ec4f
