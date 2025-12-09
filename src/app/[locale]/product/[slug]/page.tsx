import type { Metadata } from 'next';
import ProductClient from './ProductClient';
import { WATCHES } from '@/data/watches';
import type { WatchItem } from '@/interfaces';

const baseUrl =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://watch-genius-olive.vercel.app';

function isUUID(str: string): boolean {
  const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(str);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const identifier = resolvedParams.slug;

  if (isUUID(identifier)) {
    return {
      title: 'Годинник - WatchGenius',
      description: 'Детальна інформація про годинник',
      alternates: {
        canonical: `${baseUrl}/ua/product/${identifier}`,
        languages: {
          'uk-UA': `/ua/product/${identifier}`,
          'en-US': `/en/product/${identifier}`,
        },
      },
    };
  }

  const watch: WatchItem | undefined = WATCHES.find(
    (w) => w.slug === identifier
  );

  if (!watch) {
    return {
      title: 'Годинник не знайдено - WatchGenius',
      description: 'Сторінка товару не знайдена',
    };
  }

  const watchImage =
    typeof watch.image === 'string' ? watch.image : watch.image.src;

  return {
    title: `${watch.title} - Аналітика та ціни | WatchGenius`,
    description: `Детальна аналітика ${
      watch.title
    }: актуальні ціни від ${watch.price.toLocaleString()} ${
      watch.currency
    }, історія котирувань, ринкові тренди. ${watch.brand} ${
      watch.year
    } року. Порівняння пропозицій від перевірених продавців.`,
    alternates: {
      canonical: `${baseUrl}/ua/product/${watch.slug}`,
      languages: {
        'uk-UA': `/ua/product/${watch.slug}`,
        'en-US': `/en/product/${watch.slug}`,
      },
    },
    openGraph: {
      title: `${watch.title} - Аналітика та ціни`,
      description: `Актуальні ціни, історія котирувань, ринкові тренди для ${watch.brand}. AI-консультант для безпечної купівлі.`,
      images: [
        {
          url: watchImage,
          width: 1200,
          height: 630,
          alt: `${watch.title} - WatchGenius`,
        },
      ],
      url: `${baseUrl}/ua/product/${watch.slug}`,
    },
  };
}

export default function ProductPageWrapper({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return <ProductClient params={params} />;
}
