/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['masters.com'],  // Add all external domains you are using for images here
  },
};

export default nextConfig;
