"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var RGB = /** @class */ (function () {
    function RGB(r, g, b) {
        this.r = r;
        this.g = g;
        this.b = b;
        this.hsl = this.rgbToHsl();
    }
    RGB.prototype.getColorDistance = function (rgb) {
        var rDiff = rgb.r - this.r;
        var gDiff = rgb.g - this.g;
        var bDiff = rgb.b - this.b;
        return Math.sqrt(rDiff * rDiff + gDiff * gDiff + bDiff * bDiff);
    };
    RGB.prototype.equals = function (rgb) {
        return this.r === rgb.r && this.g === rgb.g && this.b === rgb.b;
    };
    RGB.prototype.rgbToHsl = function () {
        var r = this.r / 255, g = this.g / 255, b = this.b / 255;
        var max = Math.max(r, g, b), min = Math.min(r, g, b);
        var h = (max + min) / 2;
        var s = (max + min) / 2;
        var l = (max + min) / 2;
        if (max === min) {
            h = 0;
            s = 0;
        }
        else {
            var d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch (max) {
                case r:
                    h = (g - b) / d + (g < b ? 6 : 0);
                    break;
                case g:
                    h = (b - r) / d + 2;
                    break;
                case b:
                    h = (r - g) / d + 4;
                    break;
            }
            h /= 6;
        }
        return { "h": Math.floor(h * 360), "s": Math.floor(s * 100), "l": Math.floor(l * 100) };
    };
    RGB.prototype.print = function () {
        // return `rgb(r: ${this.r}, g: ${this.g}, b: ${this.b})`;
        return "[" + this.r + ", " + this.g + ", " + this.b + "],";
    };
    RGB.prototype.hslToString = function () {
        return "[" + this.hsl.h + ", " + this.hsl.s + ", " + this.hsl.l + "],";
    };
    RGB.prototype.bstSort = function (rgb) {
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
    };
    return RGB;
}());
exports.default = RGB;
