/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "export",
  basePath: "/conexiones",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
