import { MetadataRoute } from 'next';
import { WATCHES } from '@/data/watches';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://watch-genius-olive.vercel.app';

export default function sitemap(): MetadataRoute.Sitemap {

    const staticPages = [
  {
    url: `${baseUrl}/ua`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 1.0,
  },
  {
    url: `${baseUrl}/ua/catalog`,
    lastModified: new Date(),
    changeFrequency: 'hourly' as const,
    priority: 0.9,
  },
  {
    url: `${baseUrl}/ua/compare`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  },
  {
    url: `${baseUrl}/ua/privacy`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.5,
  },
  {
    url: `${baseUrl}/ua/terms`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.5,
  },
];

  const productPages = WATCHES.map((watch) => ({
    url: `${baseUrl}/ua/product/${watch.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [...staticPages, ...productPages];
}

