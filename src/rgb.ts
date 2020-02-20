export default class RGB {
  r: number;
  g: number;
  b: number;
  hsl: any;

  constructor(r: number, g: number, b: number) {
    this.r = r;
    this.g = g;
    this.b = b;
    this.hsl = this.rgbToHsl();
  }

  getColorDistance(rgb: RGB) {
    let rDiff = rgb.r - this.r;
    let gDiff = rgb.g - this.g;
    let bDiff = rgb.b - this.b;
    return Math.sqrt(rDiff * rDiff + gDiff * gDiff + bDiff * bDiff);
  }

  getHSLDiff(rgb: RGB) {
    return Math.abs(this.hsl.h - rgb.hsl.h);
  }

  equals(rgb: RGB) {
    return this.r === rgb.r && this.g === rgb.g && this.b === rgb.b;
  }

  rgbToHsl() {
    let r = this.r / 255, g = this.g / 255, b = this.b / 255;
    let max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h = (max + min) / 2;
    let s = (max + min) / 2;
    let l = (max + min) / 2;

    if (max === min) {
      h = 0;
      s = 0;
    }
    else {
      let d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }
    return { "h": Math.floor(h * 360), "s": Math.floor(s * 100), "l": Math.floor(l * 100) };
  }

  print() {
    // return `rgb(r: ${this.r}, g: ${this.g}, b: ${this.b})`;
    return `[${this.r}, ${this.g}, ${this.b}],`;
  }

  hslToString() {
    return `[${this.hsl.h}, ${this.hsl.s}, ${this.hsl.l}],`;
  }

  bstSort(rgb: RGB): number {
    if (this.hsl.h === rgb.hsl.h) {
      //  same h values
      if (this.hsl.s === rgb.hsl.s) {
        // same s value
        if (this.hsl.l === rgb.hsl.l) {
          return 0;
        }
        return this.hsl.l > rgb.hsl.l ? -1 : 1;
      }
      return this.hsl.s > rgb.hsl.s ? -1 : 1;
    }
    return this.hsl.h > rgb.hsl.h ? -1 : 1;
  }
}
