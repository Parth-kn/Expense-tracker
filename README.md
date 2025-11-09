Cloud Expense Tracker (Mini Project)
A minimal, cloud-hosted expense tracker you can deploy and demo from anywhere.

Features
Add expense: amount, category, date, note

List expenses with monthly total

Category pie chart

Export CSV of expenses

Tech Stack
Frontend: React + Vite

Backend: Azure Functions (Node.js)

Database: Azure Cosmos DB (Mongo API)

Hosting & CICD: Azure Static Web Apps

Local Development
Prerequisites
Node.js LTS

Azure CLI and Azure Functions Core Tools (optional for backend testing)

Azure account

Steps
Clone the repository:

bash
git clone <your-repo-url>
cd <project-folder>
Frontend setup:

bash
cd frontend
npm install
npm run dev
Backend setup (optional for local testing):

Put your Cosmos DB Mongo connection string in api/local.settings.json

Start backend:

bash
cd api
func start
Cloud Deployment
See DEPLOYMENT.md for complete Azure deployment steps.

Push to the main branch to trigger automatic CICD and deployment using Azure Static Web Apps.

Set the environment variable MONGOCONN in Azure (Cosmos DB connection string).

Notes
Authentication is optional for this mini project: API uses userId="demo" by default.

To simulate multiple users, pass ?userId=alice to GET and POST requests.

Export your data using the CSV feature for backup or analysis.

Demo flow:
Add expense → View monthly report/pie chart → Export CSV → Show deployed app and Azure Resources

Contributors:

Your Name (Contact/Email)

MCA Cloud Computing Project — VIT
