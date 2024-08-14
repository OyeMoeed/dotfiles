const checkImage = (icon: number | string) =>
  typeof icon === 'number' ||
  (typeof icon === 'string' && (icon.includes('.png') || icon.includes('.jpg') || icon.includes('data:image')));

export default checkImage;
