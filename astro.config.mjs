// @ts-check
import { defineConfig } from 'astro/config'
import tailwindcss from '@tailwindcss/vite'
import sitemap from '@astrojs/sitemap'
import { execSync } from 'node:child_process'

const commitHash = execSync('git rev-parse --short HEAD').toString().trim()

// CF=1 make build/dev with adapter (Cloudflare Images + KV emulation).
// without gate, dev local running witout adapter; so much faster,
// and route with prerender=false become static.
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
  output: 'static',
  adapter,
  integrations: [sitemap()],
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp',
    },
  },
  vite: {
    define: {
      __COMMIT__: JSON.stringify(commitHash),
    },
    plugins: [tailwindcss()],
  },
})
