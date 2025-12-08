import React from 'react';

export const OrganizationJsonLd = () => {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'WatchGenius',
    description:
      'Аналітика цін та трендів для 300+ моделей годинників. Персональний чат-асистент допоможе обрати годинник та купити безпечно.',
    url:
      process.env.NEXT_PUBLIC_SITE_URL ||
      'https://watch-genius-olive.vercel.app',
    logo: `${
      process.env.NEXT_PUBLIC_SITE_URL ||
      'https://watch-genius-olive.vercel.app'
    }/icons/Logo.svg`,
    sameAs: [
      'https://www.instagram.com/watchgenius',
      'https://t.me/watchgenius',
      'https://discord.gg/watchgenius',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      email: 'support@watchgenius.com',
    },
  };

  return (
    <script
      type='application/ld+json'
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
};

export const WebSiteJsonLd = () => {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'WatchGenius',
    url:
      process.env.NEXT_PUBLIC_SITE_URL ||
      'https://watch-genius-olive.vercel.app',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${
          process.env.NEXT_PUBLIC_SITE_URL ||
          'https://watch-genius-olive.vercel.app'
        }/catalog?search={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <script
      type='application/ld+json'
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
};
