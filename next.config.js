/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = {
  env: {
    server: "https://slowbee.herokuapp.com",
  },
  images: {
    domains: ["firebasestorage.googleapis.com"],
  },
  devIndicators: {
    buildActivity: false,
  },
};
