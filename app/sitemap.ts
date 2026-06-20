import { MetadataRoute } from 'next';
import { MOCK_PORTFOLIO, MOCK_PRODUCTS } from '@/lib/mock-data';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://rafalwozny.pl';

  const staticPages = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'daily' as const, priority: 1.0 },
    { url: `${baseUrl}/shop`, lastModified: new Date(), changeFrequency: 'daily' as const, priority: 0.8 },
    { url: `${baseUrl}/exhibitions`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.7 },
  ];

  const portfolioPages = MOCK_PORTFOLIO.map((item) => ({
    url: `${baseUrl}/portfolio/${item.id}`,
    lastModified: new Date(item.date),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  const productPages = MOCK_PRODUCTS.map((prod) => ({
    url: `${baseUrl}/shop/${prod.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  return [...staticPages, ...portfolioPages, ...productPages];
}
