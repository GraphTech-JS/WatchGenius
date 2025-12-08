import type { Metadata } from 'next';

const baseUrl =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://watch-genius-olive.vercel.app';
export const metadata: Metadata = {
  title: 'Політика конфіденційності - WatchGenius',
  description:
    'Політика конфіденційності WatchGenius. Як ми збираємо, використовуємо та захищаємо ваші персональні дані. Інформація про файли cookie, права користувачів та передачу даних третім особам.',
  alternates: {
    canonical: `${baseUrl}/ua/privacy`,
    languages: {
      'uk-UA': '/ua/privacy',
      'en-US': '/en/privacy',
    },
  },
  openGraph: {
    title: 'Політика конфіденційності - WatchGenius',
    description:
      'Як ми збираємо, використовуємо та захищаємо ваші персональні дані. Інформація про права користувачів.',
    url: `${baseUrl}/ua/privacy`,
    images: [
      {
        url: '/hero-section/HeroBgBig.webp',
        width: 1200,
        height: 630,
        alt: 'Політика конфіденційності - WatchGenius',
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function PrivacyPage() {
  return (
    <div className='max-w-4xl mx-auto px-4 py-12 md:py-20'>
      <h1 className='text-3xl md:text-4xl font-bold mb-8 mt-[25px]'>
        Політика конфіденційності
      </h1>

      <div className='prose prose-lg max-w-none space-y-6'>
        <p className='text-gray-600'>
          Дата останнього оновлення: 28 жовтня 2025 року
        </p>

        <section>
          <h2 className='text-2xl font-semibold mt-8 mb-4'>
            1. Збір інформації
          </h2>
          <p>
            WatchGenius збирає та обробляє наступні типи персональних даних:
          </p>
          <ul className='list-disc pl-6 space-y-2'>
            <li>
              <strong>Контактна інформація:</strong> email-адреса, ім&apos;я
            </li>
            <li>
              <strong>Технічні дані:</strong> IP-адреса, тип браузера, час
              відвідування
            </li>
            <li>
              <strong>Дані взаємодії:</strong> історія перегляду товарів,
              пошукові запити, налаштування
            </li>
          </ul>
        </section>

        <section>
          <h2 className='text-2xl font-semibold mt-8 mb-4'>
            2. Використання даних
          </h2>
          <p>Ми використовуємо ваші дані для:</p>
          <ul className='list-disc pl-6 space-y-2'>
            <li>Надання та покращення наших сервісів</li>
            <li>Персоналізації досвіду користувача</li>
            <li>Надсилання сповіщень про зміни цін (за вашою згодою)</li>
            <li>Аналізу використання платформи</li>
            <li>Комунікації з користувачами</li>
          </ul>
        </section>

        <section>
          <h2 className='text-2xl font-semibold mt-8 mb-4'>3. Захист даних</h2>
          <p>
            Ми вживаємо технічних та організаційних заходів для захисту ваших
            персональних даних:
          </p>
          <ul className='list-disc pl-6 space-y-2'>
            <li>Шифрування даних при передачі (SSL/TLS)</li>
            <li>Захищені сервери та бази даних</li>
            <li>Регулярні аудити безпеки</li>
            <li>Обмежений доступ співробітників до персональних даних</li>
          </ul>
        </section>

        <section>
          <h2 className='text-2xl font-semibold mt-8 mb-4'>4. Файли cookie</h2>
          <p>
            Ми використовуємо cookie та подібні технології для покращення роботи
            сайту, аналітики та персоналізації. Ви можете налаштувати
            використання cookie у налаштуваннях вашого браузера.
          </p>
        </section>

        <section>
          <h2 className='text-2xl font-semibold mt-8 mb-4'>
            5. Передача даних третім особам
          </h2>
          <p>Ми можемо передавати ваші дані:</p>
          <ul className='list-disc pl-6 space-y-2'>
            <li>
              <strong>Аналітичним сервісам:</strong> для аналізу використання
              сайту
            </li>
            <li>
              <strong>Партнерам:</strong> для надання запитуваних сервісів
            </li>
            <li>
              <strong>За законодавчою вимогою:</strong> у випадках, передбачених
              законом
            </li>
          </ul>
          <p>
            Ми не продаємо та не передаємо ваші персональні дані третім особам
            для маркетингових цілей без вашої згоди.
          </p>
        </section>

        <section>
          <h2 className='text-2xl font-semibold mt-8 mb-4'>6. Ваші права</h2>
          <p>
            Відповідно до законодавства про захист персональних даних, ви маєте
            право на:
          </p>
          <ul className='list-disc pl-6 space-y-2'>
            <li>Доступ до своїх персональних даних</li>
            <li>Виправлення неточних даних</li>
            <li>Видалення ваших даних</li>
            <li>Обмеження обробки даних</li>
            <li>Переносимість даних</li>
            <li>Заперечення проти обробки даних</li>
          </ul>
        </section>

        <section>
          <h2 className='text-2xl font-semibold mt-8 mb-4'>
            7. Зміни в політиці
          </h2>
          <p>
            Ми можемо оновлювати цю політику конфіденційності. Про значні зміни
            ми повідомимо вас через email або сповіщення на сайті.
          </p>
        </section>

        <section>
          <h2 className='text-2xl font-semibold mt-8 mb-4'>8. Контакти</h2>
          <p>З питань щодо політики конфіденційності звертайтесь:</p>
          <p>
            Email:{' '}
            <a
              href='mailto:privacy@watchgenius.com'
              className='text-green-600 hover:underline'
            >
              privacy@watchgenius.com
            </a>
          </p>
        </section>
      </div>
    </div>
  );
}
