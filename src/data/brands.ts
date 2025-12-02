export type BrandContent = {
  title: string;
  image: string; 
  paragraphs: string[];
};

export const BRAND_CONTENT: Record<string, BrandContent> = {
  Rolex: {
    title: 'Rolex',
    image: '/watch/RolexBrand.webp',
    paragraphs: [
      'Rolex — швейцарський символ точності, надійності та статусу. Компанія відома інженерними інноваціями та бездоганною якістю збірки.',
      'Моделі Submariner, Daytona та Datejust стали іконами індустрії — вони поєднують технологічність, впізнаваний дизайн та високу ліквідність на вторинному ринку.',
    ],
  },
  'Patek Philippe': {
    title: 'Patek Philippe',
    image: '/watch/RolexBrand.webp',
    paragraphs: [
      'Patek Philippe — вершина класичного годинникарства з акцентом на складні механізми та ручну обробку деталей.',
      'Бренд асоціюється з довгостроковою цінністю й колекційністю; моделі на кшталт Nautilus та Aquanaut мають стабільний попит.',
    ],
  },
  Omega: {
    title: 'Omega',
    image: '/watch/RolexBrand.webp',
    paragraphs: [
      'Omega поєднує інновації та історію — від місії Apollo до сучасних коаксіальних механізмів.',
      'Seamaster і Speedmaster — найвідоміші лінійки, що пропонують відмінне співвідношення якості й ціни та сильну впізнаваність.',
    ],
  },
  Tudor: {
    title: 'Tudor',
    image: '/watch/RolexBrand.webp',
    paragraphs: [
      'Tudor — сестринський бренд Rolex із фокусом на практичність, надійність та сучасний вінтажний стиль.',
      'Лінійка Black Bay стала еталоном доступного дайверського годинника з відмінною репутацією.',
    ],
  },
  Cartier: {
    title: 'Cartier',
    image: '/watch/RolexBrand.webp',
    paragraphs: [
      'Cartier — ікона ювелірного дизайну, що поєднує естетику та годинникові традиції.',
      'Моделі Tank, Santos та Ballon Bleu відомі своєю елегантністю і часто обираються як універсальні dress‑годинники.',
    ],
  },
  default: {
    title: 'Бренд',
    image: '/watch/RolexBrand.webp',
    paragraphs: [
      'Інформація про бренд буде додана пізніше. Наразі доступні загальні відомості та ключові характеристики моделі.',
    ],
  },
};


