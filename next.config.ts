/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  turbopack: {
    root: './'
  },
  experimental: {
    appDir: false
  }
}

export default nextConfig
