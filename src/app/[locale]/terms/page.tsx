import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Умови використання - WatchGenius',
  description:
    'Умови використання платформи WatchGenius. Правила та умови надання сервісів аналітики ринку годинників. Інформація про реєстрацію, використання даних, інтелектуальну власність та відповідальність.',
  alternates: {
    canonical: `${
      process.env.NEXT_PUBLIC_SITE_URL ||
      'https://watch-genius-olive.vercel.app'
    }/ua/terms`,
    languages: {
      'uk-UA': '/ua/terms',
      'en-US': '/en/terms',
    },
  },
  openGraph: {
    title: 'Умови використання - WatchGenius',
    description:
      'Правила та умови надання сервісів аналітики ринку годинників. Інформація про використання платформи.',
    url: `${
      process.env.NEXT_PUBLIC_SITE_URL ||
      'https://watch-genius-olive.vercel.app'
    }/ua/terms`,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function TermsPage() {
  return (
    <div className='max-w-4xl mx-auto px-4 py-12 md:py-20'>
      <h1 className='text-3xl md:text-4xl font-bold mb-8 mt-[25px]'>
        Умови використання
      </h1>

      <div className='prose prose-lg max-w-none space-y-6'>
        <p className='text-gray-600'>
          Дата останнього оновлення: 28 жовтня 2025 року
        </p>

        <section>
          <h2 className='text-2xl font-semibold mt-8 mb-4'>
            1. Прийняття умов
          </h2>
          <p>
            Використовуючи платформу WatchGenius, ви погоджуєтесь з цими умовами
            використання. Якщо ви не згодні з будь-якими положеннями, будь
            ласка, не використовуйте наш сервіс.
          </p>
        </section>

        <section>
          <h2 className='text-2xl font-semibold mt-8 mb-4'>2. Опис сервісу</h2>
          <p>WatchGenius надає:</p>
          <ul className='list-disc pl-6 space-y-2'>
            <li>
              <strong>Аналітику цін:</strong> моніторинг та аналіз цін на
              годинники
            </li>
            <li>
              <strong>Трендовий аналіз:</strong> аналіз ринкових трендів
            </li>
            <li>
              <strong>AI-асистент:</strong> персональний чат-бот для
              консультацій
            </li>
            <li>
              <strong>Сповіщення:</strong> повідомлення про зміни цін
            </li>
          </ul>
          <p>
            Ми не є продавцями годинників і не здійснюємо транзакції
            купівлі-продажу.
          </p>
        </section>

        <section>
          <h2 className='text-2xl font-semibold mt-8 mb-4'>
            3. Реєстрація та акаунт
          </h2>
          <ul className='list-disc pl-6 space-y-2'>
            <li>
              Ви повинні надати точну та актуальну інформацію при реєстрації
            </li>
            <li>
              Ви несете відповідальність за безпеку свого акаунту та пароля
            </li>
            <li>Один акаунт призначений для використання однією особою</li>
            <li>
              Ми залишаємо за собою право видалити акаунти, які порушують ці
              умови
            </li>
          </ul>
        </section>

        <section>
          <h2 className='text-2xl font-semibold mt-8 mb-4'>
            4. Використання даних
          </h2>
          <p>Дані на платформі WatchGenius:</p>
          <ul className='list-disc pl-6 space-y-2'>
            <li>Надаються виключно в інформаційних цілях</li>
            <li>Не є рекомендацією до купівлі або продажу</li>
            <li>
              Можуть містити неточності (хоча ми прагнемо до максимальної
              точності)
            </li>
            <li>
              Оновлюються регулярно, але можуть не відображати актуальну
              ситуацію в реальному часі
            </li>
          </ul>
        </section>

        <section>
          <h2 className='text-2xl font-semibold mt-8 mb-4'>
            5. Заборонене використання
          </h2>
          <p>При використанні WatchGenius ЗАБОРОНЕНО:</p>
          <ul className='list-disc pl-6 space-y-2'>
            <li>
              Використовувати автоматизований збір даних (скрапінг) без дозволу
            </li>
            <li>Завантажувати шкідливе програмне забезпечення або віруси</li>
            <li>Намагатись отримати несанкціонований доступ до системи</li>
            <li>Використовувати платформу для незаконної діяльності</li>
            <li>Порушувати права інтелектуальної власності</li>
            <li>
              Створювати фейкові акаунти або вводити в оману інших користувачів
            </li>
          </ul>
        </section>

        <section>
          <h2 className='text-2xl font-semibold mt-8 mb-4'>
            6. Інтелектуальна власність
          </h2>
          <p>
            Всі матеріали на WatchGenius (дизайн, контент, логотипи, код)
            захищені законами про інтелектуальну власність і є власністю
            WatchGenius або наших партнерів.
          </p>
          <p>Ви можете:</p>
          <ul className='list-disc pl-6 space-y-2'>
            <li>
              Переглядати та використовувати інформацію для особистих цілей
            </li>
          </ul>
          <p>Ви НЕ можете:</p>
          <ul className='list-disc pl-6 space-y-2'>
            <li>
              Копіювати, розповсюджувати або продавати контент без дозволу
            </li>
            <li>Використовувати дані для комерційних цілей без угоди</li>
          </ul>
        </section>

        <section>
          <h2 className='text-2xl font-semibold mt-8 mb-4'>
            7. Обмеження відповідальності
          </h2>
          <p>
            WatchGenius надається &quot;як є&quot; без гарантій будь-якого виду.
            Ми не несемо відповідальності за:
          </p>
          <ul className='list-disc pl-6 space-y-2'>
            <li>Втрати або збитки від використання платформи</li>
            <li>Неточності в даних про ціни</li>
            <li>Технічні збої або недоступність сервісу</li>
            <li>Дії третіх осіб</li>
          </ul>
        </section>

        <section>
          <h2 className='text-2xl font-semibold mt-8 mb-4'>
            8. Зміни в умовах
          </h2>
          <p>
            Ми залишаємо за собою право змінювати ці умови в будь-який час. Про
            суттєві зміни ми повідомимо користувачів через email або сповіщення
            на сайті. Продовження використання сервісу після змін означає
            прийняття нових умов.
          </p>
        </section>

        <section>
          <h2 className='text-2xl font-semibold mt-8 mb-4'>
            9. Припинення доступу
          </h2>
          <p>
            Ми залишаємо за собою право припинити або обмежити доступ до
            платформи користувачам, які порушують ці умови, без попереднього
            повідомлення.
          </p>
        </section>

        <section>
          <h2 className='text-2xl font-semibold mt-8 mb-4'>
            10. Застосовне право
          </h2>
          <p>
            Ці умови регулюються законодавством України. Всі спори вирішуються в
            порядку, передбаченому чинним законодавством України.
          </p>
        </section>

        <section>
          <h2 className='text-2xl font-semibold mt-8 mb-4'>11. Контакти</h2>
          <p>З питань щодо умов використання звертайтесь:</p>
          <p>
            Email:{' '}
            <a
              href='mailto:support@watchgenius.com'
              className='text-green-600 hover:underline'
            >
              support@watchgenius.com
            </a>
          </p>
        </section>
      </div>
    </div>
  );
}
