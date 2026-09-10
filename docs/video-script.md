# 1-minute video script

137 spoken words — **about 55 seconds** at a normal pace, 63 if you take it
slowly. Word counts are marked per section so you can tell early if you are
drifting long.

**Before you hit record:** start the dev server, connect with **Dev key →
Create + fund**, and run one throwaway swap so the event feed has something in
it. The feed only reads a bounded ledger window, so with no recent swap it will
sit empty and you lose the best moment in the demo.

---

## The script

### 0:00 – 0:08 · Open (19 words)

> "This is Stellar Studio — two apps on four Soroban smart contracts, live on
> Stellar testnet. Here is the interesting part."

*On screen: the app's landing view, swap page loaded.*

---

### 0:08 – 0:22 · The swap (23 words)

> "I'll swap twenty-five XLM for USDC, at a live orderbook rate. Watch the
> status panel — validate, quote, registry, DEX swap, done."

*On screen: type `25`, quote fills in, click Swap, let the five stages tick
through to Done.*

---

### 0:22 – 0:38 · The cross-contract moment (36 words)

> "Now the event feed. That thirty-basis-point fee wasn't calculated by the
> registry — it asked a separate fee vault contract, inside the same
> transaction. One click, two contracts, events from both."

*On screen: point at the new row in Registry events — the swap index and
`fee … (30bps)`.*

> **This is the line that matters.** Everything else is a swap UI; this is the
> part the brief is actually asking about. Do not rush it.

---

### 0:38 – 0:53 · The NFT side (37 words)

> "Same pattern for NFTs. The image goes to IPFS, the reference on chain. Mint
> straight into the pool and the collection contract calls the pool contract to
> hand it over — one transaction, two contracts."

*On screen: `/mint`, drag an image, CID appears, select **The pool**, mint,
gallery updates.*

---

### 0:53 – 1:00 · Close (22 words)

> "Fully responsive, a hundred and twenty-eight tests passing, and CI on every
> push. Links are in the README. Thanks for watching."

*On screen: quickly resize to phone width, then cut to the green Actions tab.*

---

## Timing

137 spoken words. At a normal pace that is **55 seconds**; slow and deliberate,
about **63**. Either way it fits a minute with room for the pauses while you
click through the swap — which you want, because the panel takes a few seconds
to walk its five stages and talking over silence is fine.

## If you need to trim

1. Drop the responsive resize at the end — the README screenshots cover it.
2. Cut the close to *"128 tests passing, CI on every push. Links in the README."*

**Never cut the cross-contract lines** at 0:22 and 0:38. Everything else is a
swap UI; those two moments are the project.

## If you need to fill

Running short — likely, at 55 seconds — add either of these after the swap:

> "And the registry validates in simulation first, so a bad swap costs nothing.
> It never reaches the network."

> "High-volume accounts drop from thirty basis points to ten — that tiering
> lives in the vault, so fee policy can change without touching the registry."

---

## Recording notes

* 1280×720 or larger, browser zoom at 100 %.
* Do one full practice run before recording. A cold first quote can take a few
  seconds and that is a tenth of your budget.
* If a swap fails on slippage mid-take, **keep it and explain it** — the panel
  names the stage that failed, which is a better error-handling demo than
  anything you could stage.
* No need to read the contract addresses aloud. They are in the README.

## Numbers you might be asked about

| | |
| --- | --- |
| Contracts | 4 — `swap_registry`, `fee_vault`, `nft_collection`, `nft_pool` |
| Cross-contract pairs | 2, calling in both directions |
| Base fee | 30 bps, dropping to 10 bps for high-volume accounts |
| Tests | 128 — 72 Rust, 56 frontend |
| Network | Stellar testnet |
