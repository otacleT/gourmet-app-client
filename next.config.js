/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    const headers = [];
    if (process.env.NEXT_PUBLIC_VERCEL_ENV === "preview") {
      headers.push({
        headers: [
          {
            key: "X-Robots-Tag",
            value: "noindex",
          },
        ],
        source: "/:path*",
      });
    }
    return headers;
  },
  reactStrictMode: true,
  swcMinify: true,
  env: {},
};

module.exports = nextConfig;
