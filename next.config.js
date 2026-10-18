/** @type {import('next').NextConfig} */
const imageHosts = [
  "i.pravatar.cc",
  "picsum.photos",
  "tnawrestling.com",
  "www.tnawrestling.com",
  "wrestlesquare.com",
  "www.wrestlesquare.com",
  "onlineworldofwrestling.com",
  "www.onlineworldofwrestling.com",
  "tienda.luchalibreaaa.com",
  "pbs.twimg.com",
  "encrypted-tbn0.gstatic.com",
  "hips.hearstapps.com",
  "gemini.google.com",
  "www.si.com",
  "img.noah.co.jp",
  "api.ddtpro.jp",
  "postwrestling.com",
  "www.postwrestling.com",
  "chatgpt.com",
  "m.media-amazon.com",
  "user32962.na.imgto.link",
  "user43115.na.imgto.link",
  "user46002.na.imgto.link",
  "preview.redd.it",
  "s.yimg.com",
  "www.wrestling-world.com",
  "static.wixstatic.com",
  "i.pinimg.com",
  "outsports-wp.b-cdn.net",
  "static.wikia.nocookie.net",
  "thumb.wikimedia.org",
  "wrestlepurists.com",
  "i.ytimg.com",
];

const nextConfig = {
  images: {
    // Next.js caps remotePatterns at 50 entries, so hosts are listed once each.
    remotePatterns: [...new Set(imageHosts)].map((hostname) => ({
      protocol: "https",
      hostname,
    })),
  },
};

module.exports = nextConfig;