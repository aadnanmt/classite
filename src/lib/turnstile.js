// cloudflare turnstile verification
// see full docs: https://developers.cloudflare.com/turnstile/

import { getSecret } from 'astro:env/server'

// secret fetch at module load (runtime server only).
// why: getSecret() read from Astro server env (wrangler secrets / .env / .dev.vars),
// NOT from process.env (empty shim on Workers) or import.meta.env (client bundle).
// see: https://docs.astro.build/en/guides/environment-variables/#retrieving-secrets-dynamically
const secret = getSecret('TURNSTILE_SECRET')

/**
 * @param {string} token
 * @returns {Promise<{ ok: true } | { ok: false; reason: 'missing' | 'invalid' | 'secret' | 'timeout' | 'network' }>}
 */
export const verifyTurnstile = async (token) => {
  if (!token) return { ok: false, reason: 'missing' }
  if (!secret) return { ok: false, reason: 'secret' }

  try {
    // see:https://developers.cloudflare.com/turnstile/get-started/server-side-validation/#siteverify-api-overview
    const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ secret, response: token }),
      signal: AbortSignal.timeout(5000),
    })
    const data = await res.json().catch(() => null)

    if (data?.success === true) return { ok: true }

    // Cloudflare returns error-codes array on failure
    // see:  https://developers.cloudflare.com/turnstile/get-started/server-side-validation/#siteverify-api-overview
    const codes = data?.['error-codes'] ?? []
    if (codes.includes('invalid-input-secret')) return { ok: false, reason: 'secret' }
    if (codes.includes('timeout-or-duplicate')) return { ok: false, reason: 'timeout' }
    return { ok: false, reason: 'invalid' }
  } catch (e) {
    console.error('[turnstile] verify failed:', e)
    return { ok: false, reason: 'network' }
  }
}
