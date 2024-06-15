interface IRGB {
  r: number;
  g: number;
  b: number;
}

export const useColor = () => {
  const RED = 0.2126;
  const GREEN = 0.7152;
  const BLUE = 0.0722;
  const GAMMA = 2.4;

  const hexToRgb = (hex: string) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return { r, g, b };
  };

  const luminance = ({ r, g, b }: IRGB) => {
    const a = [r, g, b].map((v) => {
      v /= 255;
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, GAMMA);
    });
    return a[0] * RED + a[1] * GREEN + a[2] * BLUE;
  };

  const contrast = (rgb1: any, rgb2: any) => {
    const lum1 = luminance(rgb1);
    const lum2 = luminance(rgb2);
    const brightest = Math.max(lum1, lum2);
    const darkest = Math.min(lum1, lum2);
    return parseFloat(((brightest + 0.05) / (darkest + 0.05)).toFixed(2));
  };

  return {
    hexToRgb,
    luminance,
    contrast,
  };
};
