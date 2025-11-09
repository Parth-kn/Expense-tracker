# Deployment Guide (Azure)

> Estimated time: 30–45 minutes

## 0) Prerequisites
- Azure account
- Azure CLI installed: https://learn.microsoft.com/cli/azure/install-azure-cli
- GitHub account (for CI/CD)
- Node.js LTS

## 1) Login & Resource Group
```bash
az login
az group create -n expense-rg -l centralindia
```

## 2) Cosmos DB (Mongo API)
Create a Cosmos DB account with Mongo API, then database and collection.
```bash
# Create account
az cosmosdb create   -n expense-cosmos-$RANDOM   -g expense-rg --kind MongoDB

# Get account name
COSMOS=$(az cosmosdb list -g expense-rg --query "[0].name" -o tsv)

# Create database and collection
az cosmosdb mongodb database create -a $COSMOS -n expense-db -g expense-rg
az cosmosdb mongodb collection create -a $COSMOS -g expense-rg   -d expense-db -n expenses --shard "_id" --throughput 400

# Get primary connection string (Portal -> Keys -> Primary Connection String)
```

## 3) Configure API settings
In Azure Static Web Apps later, set an application setting named `MONGO_CONN` with the connection string.

For local testing, update `api/local.settings.json`.

## 4) Push code to GitHub
```bash
git init
git add .
git commit -m "mini project scaffold"
# create a new GitHub repo first or use gh CLI
```

## 5) Create Azure Static Web App (SWA)
- In Azure Portal: **Create resource** → **Static Web App** (Free)
- Build details:
  - App location: `frontend`
  - API location: `api`
  - Output location: `dist`
- Connect your GitHub repo and branch `main`.
- After creation, a GitHub Action will build & deploy on every push.

## 6) Add application setting in SWA
- In the SWA resource → **Environment variables**:
  - `MONGO_CONN` = *your Cosmos Mongo connection string*
- Redeploy/Restart if needed.

## 7) Test
- Open the SWA URL.
- Add some expenses and verify data appears in **Cosmos DB** → **Data Explorer** → `expense-db` → `expenses`.

## (Optional) Enable Authentication
- SWA supports GitHub/Google/AAD B2C providers.
- If enabled, your Functions will receive the `x-ms-client-principal-id` header (user id).
```
