/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'http://localhost:3000',
  generateRobotsTxt: true,
  sitemapSize: 5000,
  changefreq: 'weekly',
  priority: 0.7,
  exclude: [
    '/PlanTrip',
    '/PopUp',
    '/terms',
    '/faq',
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
  },
};
