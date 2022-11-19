/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = {
  env: {
    // server: "https://slowbee-server.onrender.com",
    server: "http://localhost:5000",
  },
  images: {
    domains: ["firebasestorage.googleapis.com"],
  },
  devIndicators: {
    buildActivity: false,
  },
};
