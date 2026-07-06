import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "9000",
        pathname: "/kosmetichka/**"
      }
    ],
    dangerouslyAllowLocalIP: true,
    qualities: [75, 90, 100],
  }
};

export default nextConfig;
