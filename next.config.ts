import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "openweathermap.org",
        port: "",
        pathname: "/img/wn/**",
        search: "",
      },
    ],
  },
};

export default nextConfig;