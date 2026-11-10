/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'export',
  trailingSlash: true,
  // Cross-origin isolation (SharedArrayBuffer) for sqlite-wasm's OPFS VFS.
  // Applies to `next dev`; static hosting sets the same headers in amplify.yml.
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
          { key: 'Cross-Origin-Embedder-Policy', value: 'require-corp' },
        ],
      },
    ]
  },
  env: {
    // Path segment under /sqlite-wasm/ (see scripts/copy-sqlite-wasm.js)
    NEXT_PUBLIC_SQLITE_WASM_VERSION: require('@sqlite.org/sqlite-wasm/package.json').version,
  },
  images: {
    unoptimized: true,
  },
  // During build, copy our custom index.html to the out directory
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Copy custom index.html to out directory after build
      config.plugins.push({
        apply: (compiler) => {
          compiler.hooks.afterEmit.tap('CopyIndexHtml', () => {
            if (process.env.NODE_ENV === 'production') {
              console.log('Copying custom index.html to out directory');
            }
          });
        },
      });
    }
    return config;
  },
}

module.exports = nextConfig 