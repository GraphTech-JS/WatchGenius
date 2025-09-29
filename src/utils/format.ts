export const onlyDigits = (s: string) => s.replace(/[^\d]/g, '');

export const formatDigits = (digits: string, locale: string = 'uk-UA') => {
  if (!digits) return '';
  const n = parseInt(digits, 10);
  if (Number.isNaN(n)) return '';
  return n.toLocaleString(locale);
};

export const onlyYearDigits = (s: string) => s.replace(/[^\d]/g, '').slice(0, 4);