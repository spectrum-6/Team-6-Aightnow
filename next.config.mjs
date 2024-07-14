/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "/a/**",
      },
      {
        protocol: "https",
        hostname: "phinf.pstatic.net",
        pathname: "/contact/**",
      },
      {
        protocol: "http",
        hostname: "k.kakaocdn.net",
        pathname: "/dn/**",
      },
      {
        protocol: "https",
        hostname: "k.kakaocdn.net",
        pathname: "/dn/**",
      },
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
        pathname: "/v0/b/**",
      },
    ],
  },
};

export default nextConfig;
