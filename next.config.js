/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: [
      "encrypted-tbn0.gstatic.com",
      "aigeneraterandomim8e058d.blob.core.windows.net",
    ],
  },
};

module.exports = nextConfig;
