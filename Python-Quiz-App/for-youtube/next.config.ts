// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   images: {
//     domains: ["cdn.sanity.io"], // Allow images from Sanity
//   },
// };

// export default nextConfig;


import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["cdn.sanity.io"], // Allow images from Sanity
  },
  env: {
    SANITY_API_TOKEN: process.env.SANITY_API_TOKEN, // Add this line
  },
};

export default nextConfig;
