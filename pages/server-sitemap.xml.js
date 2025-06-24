import { getServerSideSitemap } from 'next-sitemap';
import { activities } from '../lib/data';

export async function getServerSideProps(ctx) {
  const baseUrl = 'https://desire4travels.com';

  try {
    const [packages, destinationsRes, blogs] = await Promise.all([
      fetch('https://desire4travels-1.onrender.com/api/packages').then(res => res.json()),
      fetch('https://desire4travels-1.onrender.com/api/admin/destinations').then(res => res.json()),
      fetch('https://desire4travels-1.onrender.com/blogs').then(res => res.json()),
    ]);

    const destinations = destinationsRes.destinations || destinationsRes;

    // Extract unique trip types from destination data
    const tripTypeSet = new Set();
    destinations.forEach(dest => {
      if (Array.isArray(dest.type)) {
        dest.type.forEach(t => tripTypeSet.add(t.toLowerCase()));
      } else if (dest.type) {
        tripTypeSet.add(dest.type.toLowerCase());
      }
    });

    const triptypes = Array.from(tripTypeSet).map(type => ({
      loc: `${baseUrl}/triptype/${type}`,
      lastmod: new Date().toISOString(),
    }));

    const fields = [
      ...packages.map(pkg => ({
        loc: `${baseUrl}/package/${pkg.id}`,
        lastmod: new Date().toISOString(),
      })),
      ...blogs.map(blog => ({
        loc: `${baseUrl}/blogs/${blog.slug}`,
        lastmod: new Date().toISOString(),
      })),
      ...destinations.map(dest => ({
        loc: `${baseUrl}/destination/${dest.name}`,
        lastmod: new Date().toISOString(),
      })),
      ...activities.map(item => ({
        loc: `${baseUrl}/activity/${item.slug || item.name}`,
        lastmod: new Date().toISOString(),
      })),
      ...triptypes,
    ];

    return getServerSideSitemap(ctx, fields);
  } catch (error) {
    console.error('❌ Error generating sitemap:', error);
    return { notFound: true };
  }
}

export default function Sitemap() {}
