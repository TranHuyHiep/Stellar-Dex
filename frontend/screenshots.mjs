/**
 * Capture the screenshots the README embeds, against a running dev server and
 * the live testnet deployment, so the images always show the contracts the
 * docs actually describe.
 *
 *   npm run dev &            # or APP_URL=<deployed url>
 *   node screenshots.mjs
 *
 * Writes into ../images/. Every shot funds a fresh dev key via Friendbot, so
 * this touches testnet but spends nothing that matters.
 */
import { chromium } from 'playwright'
import { mkdir } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'

const APP = (process.env.APP_URL ?? 'http://127.0.0.1:5173/').replace(/\/$/, '')
const OUT = fileURLToPath(new URL('../images/', import.meta.url))
const MOBILE = { width: 390, height: 844 } // iPhone 14
const DESKTOP = { width: 1440, height: 900 }

await mkdir(OUT, { recursive: true })
const browser = await chromium.launch()

/** A page that reports console errors rather than hiding a broken shot. */
async function open(viewport, path = '/') {
  const page = await browser.newPage({ viewport, deviceScaleFactor: 2 })
  page.setDefaultTimeout(120_000)
  const errors = []
  page.on('console', (m) => m.type() === 'error' && errors.push(m.text()))
  page.on('pageerror', (e) => errors.push(e.message))
  await page.goto(APP + path, { waitUntil: 'domcontentloaded', timeout: 60000 })
  await page.waitForSelector('h1')
  return { page, errors }
}

/** Friendbot-funded dev key: no extension needed in headless Chromium. */
async function connect(page) {
  await page.click('button:has-text("Dev key")')
  await page.click('button:has-text("Create + fund")')
  await page.waitForSelector('.conn-badge', { timeout: 120_000 })
  return (await page.textContent('.conn-badge')).trim()
}

const shots = []

// --- 1. mobile swap, with a live quote on screen -------------------------
{
  const { page, errors } = await open(MOBILE)
  console.log('mobile-swap connected:', await connect(page))
  await page.fill('#sell-amount', '25')
  // The quote is the proof the orderbook is live, so wait for it to land.
  await page.waitForFunction(
    () => (document.querySelector('#buy-amount')?.value ?? '') !== '',
    { timeout: 60_000 },
  )
  console.log('mobile-swap quote:', await page.inputValue('#buy-amount'))
  await page.screenshot({ path: OUT + 'mobile-swap.png', fullPage: true })
  shots.push(['mobile-swap.png', errors])
  await page.close()
}

// --- 2. mobile mint ------------------------------------------------------
{
  const { page, errors } = await open(MOBILE, '/mint')
  console.log('mobile-mint connected:', await connect(page))
  await page.screenshot({ path: OUT + 'mobile-mint.png', fullPage: true })
  shots.push(['mobile-mint.png', errors])
  await page.close()
}

// --- 3. desktop swap, event feed streaming -------------------------------
{
  const { page, errors } = await open(DESKTOP)
  console.log('desktop-swap connected:', await connect(page))
  await page.fill('#sell-amount', '25')
  await page.waitForFunction(
    () => (document.querySelector('#buy-amount')?.value ?? '') !== '',
    { timeout: 60_000 },
  )
  // The feed polls on a tick; give it one full cycle so the shot shows real
  // events rather than the loading skeleton.
  await page.waitForFunction(
    () => (document.querySelectorAll('.feed li, .feed-row').length ?? 0) > 0,
    { timeout: 60_000 },
  ).catch(() => console.log('desktop-swap: feed still empty, capturing anyway'))
  await page.screenshot({ path: OUT + 'desktop-swap.png', fullPage: true })
  shots.push(['desktop-swap.png', errors])
  await page.close()
}

await browser.close()

console.log('\nwrote:')
let bad = 0
for (const [name, errors] of shots) {
  console.log(`  images/${name}${errors.length ? `  (console errors: ${errors.length})` : ''}`)
  if (errors.length) {
    console.log('   ', errors.slice(0, 3).join('\n    '))
    bad += errors.length
  }
}
process.exit(bad ? 1 : 0)
