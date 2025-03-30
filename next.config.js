/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080',
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