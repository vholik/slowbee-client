/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = {
  env: {
    server: "https://wild-red-kitten-wrap.cyclic.app",
    // server: "http://localhost:5000",
  },
  images: {
    domains: ["firebasestorage.googleapis.com"],
  },
  devIndicators: {
    buildActivity: false,
  },
};
