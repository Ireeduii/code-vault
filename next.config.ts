// // // import type { NextConfig } from "next";

// // // const nextConfig: NextConfig = {
// // //   // Prisma болон pg сангуудыг Next.js сервер талд тусгаарлах
// // //   serverExternalPackages: ["@prisma/client", "prisma", "pg"],

// // //   webpack: (config, { isServer }) => {
// // //     if (!isServer) {
// // //       config.resolve.fallback = {
// // //         ...config.resolve.fallback,
// // //         fs: false,
// // //         net: false,
// // //         tls: false,
// // //         dns: false,
// // //         util: false,
// // //         path: false,
// // //         stream: false,
// // //       };
// // //     }
// // //     return config;
// // //   },
// // // };

// // // export default nextConfig;

// // import type { NextConfig } from "next";

// // const nextConfig: NextConfig = {
// //   serverExternalPackages: ["@prisma/client", "prisma", "pg"],
// //   eslint: {
// //     // Build хийх явцад ESLint алдааг үл тоомсорлох (алдаанаас болж build унахаас сэргийлнэ)
// //     ignoreDuringBuilds: true,
// //   },
// //   typescript: {
// //     ignoreBuildErrors: true,
// //   },
// // };

// // export default nextConfig;

// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   // Next.js-д pg болон prisma сангууд зөвхөн server дээр ажиллах ёстойг сануулах
//   serverExternalPackages: [
//     "@prisma/client",
//     "@prisma/adapter-pg",
//     "pg",
//     "prisma",
//   ],

//   webpack: (config, { isServer }) => {
//     if (!isServer) {
//       // Client талдаа Node.js-ийн модулиудыг дуудахаас бүрэн хамгаалах
//       config.resolve.fallback = {
//         ...config.resolve.fallback,
//         fs: false,
//         net: false,
//         tls: false,
//         dns: false,
//         util: false,
//         path: false,
//         stream: false,
//         crypto: false,
//       };
//     }
//     return config;
//   },
// };

// export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Next.js 15+ болон Prisma 7-д зориулж сервер талын пакетуудыг гадагшлуулах
  serverExternalPackages: [
    "@prisma/client",
    "@prisma/adapter-pg",
    "pg",
    "prisma",
  ],

  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Client талд pg болон түүний хамаарлуудыг огт хайхгүй байхаар хориглох
      config.resolve.alias = {
        ...config.resolve.alias,
        pg: false,
      };
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        dns: false,
        util: false,
        path: false,
        stream: false,
        crypto: false,
      };
    }
    return config;
  },
};

export default nextConfig;
