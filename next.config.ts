import type { NextConfig } from 'next'

// Deployment targets:
//   Vercel        → default. Server runtime, API routes, streaming — everything on.
//   GitHub Pages  → `bun run build:pages`. Sets NEXT_OUTPUT=export + NEXT_BASE_PATH=/<repo>,
//                   strips server-only routes (see scripts/build-static.sh).
const isStaticExport = process.env.NEXT_OUTPUT === 'export'
const basePath       = process.env.NEXT_BASE_PATH ?? ''

const config: NextConfig = {
  reactStrictMode: true,
  output:          isStaticExport ? 'export' : undefined,
  basePath:        basePath.length > 0 ? basePath : undefined,
  images:          { unoptimized: isStaticExport },
}

export default config
