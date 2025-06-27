// import { getServerSideSitemapLegacy } from 'next-sitemap';
// import { activities } from '../lib/data';

// const slugify = str =>
//   str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

// export async function getServerSideProps(ctx) {
//   const baseUrl = 'https://desire4travels.com';

//   try {
//     const [packagesRes, destinationsRes, blogsRes] = await Promise.all([
//       fetch('https://desire4travels-1.onrender.com/api/packages').then(res => res.json()).catch(() => []),
//       fetch('https://desire4travels-1.onrender.com/api/admin/destinations').then(res => res.json()).catch(() => []),
//       fetch('https://desire4travels-1.onrender.com/blogs').then(res => res.json()).catch(() => []),
//     ]);

//     const packages = Array.isArray(packagesRes) ? packagesRes : [];
//     const destinationsData = destinationsRes?.destinations || destinationsRes;
//     const destinations = Array.isArray(destinationsData) ? destinationsData : [];
//     const blogs = Array.isArray(blogsRes) ? blogsRes : [];
//     const activitiesSafe = Array.isArray(activities) ? activities : [];

//     // Extract unique trip types
//     const tripTypeSet = new Set();
//     destinations.forEach(dest => {
//       if (Array.isArray(dest.type)) {
//         dest.type.forEach(t => tripTypeSet.add(t.toLowerCase()));
//       } else if (dest.type) {
//         tripTypeSet.add(dest.type.toLowerCase());
//       }
//     });

//     const triptypes = Array.from(tripTypeSet).map(type => ({
//       loc: `${baseUrl}/triptype/${slugify(type)}`,
//       lastmod: new Date().toISOString(),
//     }));

//     const fields = [
//       // ✅ Packages
//       ...packages.map(pkg => ({
//         loc: `${baseUrl}/package/${slugify(pkg.packageName)}`,
//         lastmod: new Date().toISOString(),
//       })),

//       // ✅ Blogs
//       ...blogs.map(blog => ({
//         loc: `${baseUrl}/blogs/${encodeURIComponent(blog.slug)}`,
//         lastmod: new Date().toISOString(),
//       })),

//       // ✅ Destinations
//       ...destinations.map(dest => ({
//         loc: `${baseUrl}/destination/${encodeURIComponent(dest.name)}`,
//         lastmod: new Date().toISOString(),
//       })),

//       // ✅ Activities
//       ...activitiesSafe.map(act => ({
//         loc: `${baseUrl}/activity/${encodeURIComponent(act.slug || act.name)}`,
//         lastmod: new Date().toISOString(),
//       })),

//       // ✅ Triptypes
//       ...triptypes,

//       // ✅ Plantrip static page
//       {
//         loc: `${baseUrl}/plantrip`,
//         lastmod: new Date().toISOString(),
//       },
//     ];

//     console.log('✅ Sitemap fields count:', fields.length);

//     return getServerSideSitemapLegacy(ctx, fields);
//   } catch (error) {
//     console.error('❌ Error generating sitemap:', error);
//     return { notFound: true };
//   }
// }

// export default function Sitemap() {}


import { getServerSideSitemapLegacy } from 'next-sitemap';
import { activities } from '../lib/data';

const slugify = str =>
  str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

export async function getServerSideProps(ctx) {
  const baseUrl = 'https://desire4travels.com'; // Your frontend domain
  const apiBase = 'https://desire4travels-1.onrender.com'; // Render backend

  try {
    const [packagesRes, destinationsRes, blogsRes] = await Promise.all([
      fetch(`${apiBase}/api/packages`).then(res => res.json()).catch(() => []),
      fetch(`${apiBase}/api/admin/destinations`).then(res => res.json()).catch(() => []),
      fetch(`${apiBase}/blogs`).then(res => res.json()).catch(() => []),
    ]);

    const packages = Array.isArray(packagesRes) ? packagesRes : [];
    const destinationsData = destinationsRes?.destinations || destinationsRes;
    const destinations = Array.isArray(destinationsData) ? destinationsData : [];
    const blogs = Array.isArray(blogsRes) ? blogsRes : [];
    const activitiesSafe = Array.isArray(activities) ? activities : [];

    // Unique triptypes from destinations
    const tripTypeSet = new Set();
    destinations.forEach(dest => {
      if (Array.isArray(dest.type)) {
        dest.type.forEach(t => tripTypeSet.add(t.toLowerCase()));
      } else if (dest.type) {
        tripTypeSet.add(dest.type.toLowerCase());
      }
    });

    const triptypes = Array.from(tripTypeSet).map(type => ({
      loc: `${baseUrl}/triptype/${slugify(type)}`,
      lastmod: new Date().toISOString(),
    }));

    // Combine static + dynamic sitemap fields
    const fields = [
      // 🔹 Static
      {
        loc: `${baseUrl}/`,
        lastmod: new Date().toISOString(),
        changefreq: 'weekly',
        priority: 0.7,
      },
      {
        loc: `${baseUrl}/destination`,
        lastmod: new Date().toISOString(),
        changefreq: 'weekly',
        priority: 0.7,
      },
      {
        loc: `${baseUrl}/package`,
        lastmod: new Date().toISOString(),
        changefreq: 'weekly',
        priority: 0.7,
      },
     {
        loc: `${baseUrl}/blogs`,
        lastmod: new Date().toISOString(),
        changefreq: 'weekly',
        priority: 0.7,
      },

      // 🔹 Packages
      ...packages.map(pkg => ({
        loc: `${baseUrl}/package/${slugify(pkg.packageName)}`,
        lastmod: new Date().toISOString(),
      })),

      // 🔹 Blogs
      ...blogs.map(blog => ({
        loc: `${baseUrl}/blogs/${encodeURIComponent(blog.slug)}`,
        lastmod: new Date().toISOString(),
      })),

      // 🔹 Destinations
      ...destinations.map(dest => ({
        loc: `${baseUrl}/destination/${encodeURIComponent(dest.name)}`,
        lastmod: new Date().toISOString(),
      })),

      // 🔹 Activities
      ...activitiesSafe.map(act => ({
        loc: `${baseUrl}/activity/${encodeURIComponent(act.slug || act.name)}`,
        lastmod: new Date().toISOString(),
      })),

      // 🔹 Triptypes
      ...triptypes,

      // 🔹 Static Plan Trip page
      {
        loc: `${baseUrl}/plantrip`,
        lastmod: new Date().toISOString(),
      },
    ];

    console.log('✅ Total sitemap entries:', fields.length);

    return getServerSideSitemapLegacy(ctx, fields);
  } catch (error) {
    console.error('❌ Error generating sitemap:', error);
    return { notFound: true };
  }
}

export default function Sitemap() {}
