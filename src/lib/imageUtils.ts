const WATCH_PLACEHOLDER_IMAGES = [
  '/watch/watch-random/img_1.webp',
  '/watch/watch-random/img_2.webp',
  '/watch/watch-random/img_3.webp',
  '/watch/watch-random/img_4.webp',
  '/watch/watch-random/img_5.webp',
  '/watch/watch-random/img_6.webp',
  '/watch/watch-random/img_7.webp',
  '/watch/watch-random/img_8.webp',
  '/watch/watch-random/img_9.webp',
  '/watch/watch-random/img_10.webp',
  '/watch/watch-random/img_11.webp',
  '/watch/watch-random/img_12.webp',
  '/watch/watch-random/img_13.webp',
  '/watch/watch-random/img_14.webp',
  '/watch/watch-random/img_15.webp',
  '/watch/watch-random/img_16.webp',
  '/watch/watch-random/img_17.webp',
  '/watch/watch-random/img_18.webp',
  '/watch/watch-random/img_19.webp',
  '/watch/watch-random/img_20.webp',
];

export function getRandomWatchImage(watchId: string): string {
  if (!watchId) {
    return WATCH_PLACEHOLDER_IMAGES[0];
  }

  let hash = 0;
  for (let i = 0; i < watchId.length; i++) {
    hash += watchId.charCodeAt(i);
  }

  const index = Math.abs(hash) % WATCH_PLACEHOLDER_IMAGES.length;
  return WATCH_PLACEHOLDER_IMAGES[index];
}
