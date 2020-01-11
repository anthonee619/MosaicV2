export default class RGB {
  r: number;
  g: number;
  b: number;

  constructor(r: number, g: number, b: number) {
    this.r = r;
    this.g = g;
    this.b = b;
  }

  getColorDistance(rgb: RGB) {
    let rDiff = rgb.r - this.r;
    let gDiff = rgb.g - this.g;
    let bDiff = rgb.b - this.b;
    return Math.sqrt(rDiff * rDiff + gDiff * gDiff + bDiff * bDiff);
  }
}
