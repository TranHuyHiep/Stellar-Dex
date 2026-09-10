# YouTube upload

Copy each block straight into the matching field. Two placeholders need filling
before you publish: the **live demo URL** and, in the pinned comment, the
**video's own URL** once YouTube gives you one.

---

## Title

Pick one. The first is the safest for a hackathon judge scanning a list.

```
Stellar Studio - Cross-Contract DEX Swaps & NFT Minting on Soroban
```

```
One Transaction, Two Smart Contracts - Stellar Soroban Demo
```

```
Stellar Studio: DEX Swap + NFT Minting on 4 Soroban Contracts (Testnet)
```

> Lengths: 66, 59 and 71 characters — all well inside YouTube's 100-character
> limit. Search results and mobile start truncating around 60, which only the
> middle option clears. That does not matter much for a submission where the
> judge opens your link directly, but if you want one that never gets cut,
> `Stellar Studio - Cross-Contract Swaps & NFT Minting` is 51.

---

## Description

Everything above "read more" is the first ~150 characters, so the hook comes
first.

```
Four Soroban smart contracts on Stellar testnet, arranged as two cross-contract pairs. One click, one transaction, two contracts executing.

Stellar Studio is two apps sharing one codebase:

SWAP - Trade XLM / USDC / EURC at live orderbook rates. A swap_registry contract validates the trade and asks a separate fee_vault contract what the fee should be, then the swap settles on Stellar's classic DEX.

MINT NFT - Upload an image to IPFS, mint it on chain. Mint straight into the pool and nft_collection calls nft_pool to hand custody over.

The point is the cross-contract call: a single submitted transaction that runs two contracts and emits events from both. You can watch it happen in the live event feed, and verify it on the explorer afterwards.

--- TRY IT ---

Live demo: <PASTE YOUR VERCEL URL>
Source: https://github.com/TranHuyHiep/Stellar-Dex

No wallet needed - click "Dev key -> Create + fund" and Friendbot funds a testnet account instantly. Nothing here touches real money.

--- DEPLOYED CONTRACTS (Stellar testnet) ---

swap_registry   CCRQPERNC67KO2QLWDUAGBC5GAGL5JEC4HCM5HQIXVCXT7QU7FQLZGMM
fee_vault       CC6AATAR2D2M6J6BQL6E7DXNS25THEVX76363DSPCFNKG2Y3U6J3IUY4
nft_collection  CBMIQ343QRVOUGXE7OUPCZNNYGWBDWMS56UALN5NIHWZALN6IDYYYEUV
nft_pool        CBADR5KPKYFMMMMOUWYIZXZ4NZGRWTNPJEUQN6OLGU52OLWALT2CKTZG

--- VERIFY IT YOURSELF ---

Two contracts, one transaction (NFT deposit):
https://stellar.expert/explorer/testnet/tx/667b1f711799f3d01155a286031ba5959f1402ed438a792d67f10910e430e666

Two contracts, one transaction (mint into pool):
https://stellar.expert/explorer/testnet/tx/9d0ab21ff3713d21e7c1975341d3fa2aad9a25fd0587d3b4c074657ad6d5f685

Registry + fee vault on a swap:
https://stellar.expert/explorer/testnet/tx/210ba4c203fe2ea1b356f0c477a50dd33e5bc47b76e9271d756bff2746704e24

--- BUILT WITH ---

Rust / Soroban SDK - four contracts with typed errors, contract events, admin gates and pause switches
React 19 + TypeScript + Vite
Stellar SDK + Horizon + Soroban RPC
IPFS (Pinata) for NFT images
GitHub Actions - fmt, clippy, 72 contract tests, wasm build, frontend typecheck, lint, 56 tests, and an automatic frontend deploy

128 tests passing. Mobile responsive. Full docs in the repo.

--- CHAPTERS ---

0:00 What this is
0:08 Live swap on the real orderbook
0:22 The cross-contract moment
0:38 NFT minting into the pool
0:53 Tests and CI

#Stellar #Soroban #SmartContracts #Web3 #Blockchain #Rust #DeFi #NFT
```

---

## Tags

Paste as one comma-separated line. YouTube caps the field at 500 characters;
this is about 300.

```
stellar, soroban, stellar blockchain, smart contracts, cross contract call, rust smart contracts, soroban tutorial, stellar dex, decentralized exchange, nft minting, ipfs, web3, blockchain development, stellar testnet, defi, react web3, hackathon project, stellar sdk, horizon api, dapp
```

---

## Settings

| Field | Value |
| --- | --- |
| Visibility | **Unlisted** or **Public** — never Private, a judge cannot open a private video |
| Category | Science & Technology |
| Audience | **Not** made for kids |
| Language | English |
| Comments | On, so a reviewer can ask something |
| License | Standard YouTube licence |

> The one that actually costs people marks is **Private**. Unlisted is fine:
> anyone with the link can watch, and it stays out of search.

---

## Thumbnail

You do not need a designed thumbnail for a submission — but the auto-generated
frame is usually a blurry mid-click. Either:

* Pause on the event feed showing the swap row with `fee ... (30bps)` and
  screenshot that, or
* Use [`images/desktop-swap.png`](../images/desktop-swap.png), which already
  shows the app with a live event in the feed.

If you want text on it, three words maximum, very large:
**"One TX, Two Contracts"**.

---

## Pinned comment

Post this on your own video and pin it. It puts the links one tap away on
mobile, where descriptions are collapsed.

```
Live demo: <PASTE YOUR VERCEL URL>
Code: https://github.com/TranHuyHiep/Stellar-Dex

The bit worth seeing is at 0:22 - a single transaction that executes two separate Soroban contracts and emits events from both. Explorer links for those transactions are in the description if you want to check them.

No wallet needed to try it, everything runs on Stellar testnet.
```

---

## After uploading

1. Copy the video URL.
2. Paste it into the README, replacing the demo-video `<TODO>` near the top —
   or tell me and I'll do it and push.
3. Paste it into the pinned comment placeholder above.
4. Watch it once at 1x, all the way through. Check the audio is actually there
   and the text on screen is legible at 720p — that catches most upload
   problems.
