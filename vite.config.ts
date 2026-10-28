import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vite'

// Cloudflare Web Analytics (cookieless). The beacon is added only when
// CF_BEACON_TOKEN is set (Cloudflare Pages → Settings → Variables and Secrets,
// Production). Use the site TOKEN from Web Analytics → Manage site → JS snippet,
// not the site tag from the dashboard URL.
function cloudflareBeacon(): Plugin {
  const token = process.env.CF_BEACON_TOKEN?.trim()
  return {
    name: 'cloudflare-web-analytics-beacon',
    apply: 'build',
    transformIndexHtml() {
      if (!token) return []
      return [
        {
          tag: 'script',
          attrs: {
            defer: true,
            src: 'https://static.cloudflareinsights.com/beacon.min.js',
            'data-cf-beacon': JSON.stringify({ token }),
          },
          injectTo: 'head',
        },
      ]
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), cloudflareBeacon()],
})
