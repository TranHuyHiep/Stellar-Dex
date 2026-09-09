# Deployment

Two independent pipelines: the **frontend** goes to Vercel on every push to
`main`, the **contracts** are deployed by hand because doing so spends funds
and rotates the addresses the frontend points at.

---

## Frontend → Vercel

[`.github/workflows/deploy-frontend.yml`](.github/workflows/deploy-frontend.yml)
typechecks, tests and builds before publishing, so a broken bundle never
reaches the demo URL. [`vercel.json`](vercel.json) holds the build contract.

### One-time setup

1. **Import the repo.** <https://vercel.com/new> → pick this repository →
   **Import**. Leave every build setting at its default: `vercel.json`
   overrides them (`buildCommand`, `outputDirectory: frontend/dist`).
2. **Get the three values.**
   - `VERCEL_TOKEN` — <https://vercel.com/account/tokens> → *Create Token*.
   - `VERCEL_ORG_ID` and `VERCEL_PROJECT_ID` — Project → **Settings** →
     **General**, or run `npx vercel link` locally and read `.vercel/project.json`.
3. **Add them as GitHub secrets.** Repo → **Settings** → *Secrets and
   variables* → **Actions** → *New repository secret*, once per value.
4. **Push to `main`.** The workflow builds and deploys, and prints the live
   URL in the run summary.

Without the secrets the workflow still runs — it builds and tests, then logs a
warning and skips the deploy step instead of failing red.

### Environment variables

**None are required.** Every value in
[`frontend/src/lib/config.ts`](frontend/src/lib/config.ts) falls back to a
working testnet default, so a clean build talks to the deployed contracts as
shipped.

Set one only to change that default — under Project → Settings →
*Environment Variables*:

| Variable | Set it when |
| --- | --- |
| `VITE_PINATA_JWT` | You want minted images **pinned** to IPFS. Without it the CID is still derived from the file's bytes and the mint succeeds, but nothing is pinned. |
| `VITE_CONTRACT_ID`, `VITE_FEE_VAULT_ID`, `VITE_NFT_COLLECTION_ID`, `VITE_NFT_POOL_ID` | You redeployed the contracts. Copy the values `scripts/deploy.sh` prints. |
| `VITE_NETWORK`, `VITE_NETWORK_PASSPHRASE`, `VITE_HORIZON_URL`, `VITE_SOROBAN_RPC_URL` | Pointing at a network other than testnet. |

See [`frontend/.env.example`](frontend/.env.example) for the full list.

### SPA routing

The app uses `react-router-dom` with a `/mint` route. Served as plain static
files a deep link to `/mint` returns **404** — verified locally: a static
server without a fallback 404s, with one it returns `index.html` and the
router takes over. The `rewrites` block in `vercel.json` is what makes the
deployed `/mint` link work, so don't drop it.

---

## Contracts → testnet

Manual, via [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)
(*Actions* → *Deploy contracts* → *Run workflow*) or locally:

```bash
./scripts/deploy.sh testnet deployer
```

The script builds all four wasm files, deploys and initializes each one, links
both contract pairs **in both directions**, verifies every link, smoke-checks
the result, then writes [`deployment.json`](deployment.json) and prints the
`frontend/.env.local` values to paste.

The CI route needs `DEPLOYER_SECRET` as an **environment** secret (Settings →
Environments → `testnet`), not a repository secret, so a deploy cannot pick up
credentials scoped to another network.

> Redeploying rotates all four addresses. `deployment.json`, the README table
> and the Vercel environment variables all have to be updated together, or the
> UI and the docs will describe different contracts.
