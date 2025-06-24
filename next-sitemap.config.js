// /** @type {import('next-sitemap').IConfig} */
// module.exports = {
//   // siteUrl: 'https://desire4travels-nextjs-frontend.vercel.app',
//   siteUrl: 'https://desire4travels.com',
//   generateRobotsTxt: true,
//   sitemapSize: 5000,
//   changefreq: 'weekly',
//   priority: 0.7,
//   exclude: [
//     '/PlanTrip',
//     '/PopUp',
//     '/terms',
//     '/faq',
//   ],
//   robotsTxtOptions: {
//     policies: [
//       {
//         userAgent: '*',
//         allow: '/',
//         disallow: [
//           '/PlanTrip',
//           '/PopUp',
//           '/terms',
//           '/faq',
//         ],
//       },
//     ],
//   },
// };


/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://desire4travels.com', // ✅ Production domain
  generateRobotsTxt: true,               // ✅ Generate robots.txt
  sitemapSize: 5000,                     // ✅ Break into multiple sitemaps if large
  changefreq: 'weekly',                  // ✅ Recommended frequency for travel updates
  priority: 0.7,                         // ✅ Default priority
  exclude: [
    '/PlanTrip',
    '/PopUp',
    '/terms',
    '/faq',
    '/server-sitemap.xml'               // ⛔️ Prevent SSR sitemap from being duplicated
  ],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/PlanTrip',
          '/PopUp',
          '/terms',
          '/faq',
        ],
      },
    ],
    additionalSitemaps: [
      'https://desire4travels.com/server-sitemap.xml', // ✅ Point to your dynamic SSR sitemap
    ],
  },
};
