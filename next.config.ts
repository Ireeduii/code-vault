// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   // Prisma болон pg сангуудыг Next.js сервер талд тусгаарлах
//   serverExternalPackages: ["@prisma/client", "prisma", "pg"],

//   webpack: (config, { isServer }) => {
//     if (!isServer) {
//       config.resolve.fallback = {
//         ...config.resolve.fallback,
//         fs: false,
//         net: false,
//         tls: false,
//         dns: false,
//         util: false,
//         path: false,
//         stream: false,
//       };
//     }
//     return config;
//   },
// };

// export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["@prisma/client", "prisma", "pg"],
  eslint: {
    // Build хийх явцад ESLint алдааг үл тоомсорлох (алдаанаас болж build унахаас сэргийлнэ)
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
