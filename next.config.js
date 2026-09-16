/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.pravatar.cc",
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
    ],

    domains: [
      "tnawrestling.com",
      "www.tnawrestling.com",

      "wrestlesquare.com",
      "www.wrestlesquare.com",

      "onlineworldofwrestling.com",
      "www.onlineworldofwrestling.com",

      "pbs.twimg.com",
      "encrypted-tbn0.gstatic.com",
      "hips.hearstapps.com",

      "www.si.com",

      "chatgpt.com",
      "m.media-amazon.com",
      "user32962.na.imgto.link",
    ],
  },
};

module.exports = nextConfig;