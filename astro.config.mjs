// @ts-check
import { defineConfig, fontProviders } from 'astro/config'
import tailwindcss from '@tailwindcss/vite'
import sitemap from '@astrojs/sitemap'
import { execSync } from 'node:child_process'

const commitHash = execSync('git rev-parse --short HEAD').toString().trim()

/** CF=1 build/dev with adapter (Cloudflare Images + KV emulation).
 * without gate, dev local runs without adapter; soo.. much fasterr.
 * output flip WITH adapter:
 * static = everything prerender (default true),
 * server = on demand default, static page opt out via literal `prerender = true`.
 * route-level prerender MUST stay literal, astro resolve it by AST extraction,
 * any expression/identifier is silently ignore (fallback to default).
 */

const useCF = process.env.CF === '1'
/** @type {import('astro').AstroIntegration | undefined} */
let adapter
if (useCF) {
  const { default: cloudflare } = await import('@astrojs/cloudflare')
  adapter = cloudflare()
}

// https://astro.build/config
export default defineConfig({
  site: 'https://fo.nanoolabs.dev',
  output: useCF ? 'server' : 'static',
  adapter,
  integrations: [sitemap()],
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp',
    },
  },
  fonts: [
    {
      provider: fontProviders.fontsource(),
      name: 'Space Grotesk',
      cssVariable: '--font-sans',
      weights: ['300 700'],
      fallbacks: ['ui-sans-serif', 'system-ui', 'sans-serif'],
    },
    {
      provider: fontProviders.fontsource(),
      name: 'JetBrains Mono',
      cssVariable: '--font-mono',
      weights: ['400 700'],
      fallbacks: ['ui-monospace', 'SF Mono', 'monospace'],
    },
  ],
  // https://vite.dev/config/shared-options#define
  vite: {
    define: {
      __COMMIT__: JSON.stringify(commitHash),
    },
    plugins: [tailwindcss()],
  },
})
