// @ts-check
import { defineConfig } from 'astro/config'
import tailwindcss from '@tailwindcss/vite'
import sitemap from '@astrojs/sitemap'
import { execSync } from 'node:child_process'

const commitHash = execSync('git rev-parse --short HEAD').toString().trim()

// https://astro.build/config
export default defineConfig({
  // static mode
  site: 'https://example.dev',
  output: 'static',
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
