"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jimp_image_1 = __importDefault(require("./jimp-image"));
var MNG_1 = __importDefault(require("./MNG"));
var report_json_1 = require("./report.json");
// import JimpList from './jimplist';
var jimplist2_1 = __importDefault(require("./jimplist2"));
var rgb_1 = __importDefault(require("./rgb"));
var newData = report_json_1.DATA.donations.map(function (item) {
    return item.profile_image_url;
});
function example() {
    return __awaiter(this, void 0, void 0, function () {
        var inputImage, _a, outputImageName;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = jimp_image_1.default.bind;
                    return [4 /*yield*/, jimp_image_1.default.read('./imgs/1.jpg')];
                case 1:
                    inputImage = new (_a.apply(jimp_image_1.default, [void 0, _b.sent()]))();
                    return [4 /*yield*/, new MNG_1.default(inputImage, newData).generate()];
                case 2:
                    outputImageName = _b.sent();
                    console.log("Final Mosaic Image was saved at location '" + outputImageName + "'");
                    return [2 /*return*/];
            }
        });
    });
}
var rgbs = [
    { color: "black", rgb: new rgb_1.default(0, 0, 0) },
    { color: "white", rgb: new rgb_1.default(255, 255, 255) },
    { color: "red", rgb: new rgb_1.default(255, 0, 0) },
    { color: "lime", rgb: new rgb_1.default(0, 255, 0) },
    { color: "blue", rgb: new rgb_1.default(0, 0, 255) },
    { color: "yellow", rgb: new rgb_1.default(255, 255, 0) },
    { color: "cyan", rgb: new rgb_1.default(0, 255, 255) },
    { color: "magenta", rgb: new rgb_1.default(255, 0, 255) },
];
exports.exampleSort = [
    new rgb_1.default(255, 0, 0),
    new rgb_1.default(255, 127, 0),
    new rgb_1.default(255, 127, 127),
    new rgb_1.default(255, 255, 0),
    new rgb_1.default(127, 255, 0),
    new rgb_1.default(0, 255, 0),
    new rgb_1.default(0, 255, 127),
    new rgb_1.default(0, 255, 255),
    new rgb_1.default(0, 127, 255),
    new rgb_1.default(0, 0, 255),
    new rgb_1.default(127, 0, 255),
    new rgb_1.default(255, 0, 255),
    new rgb_1.default(255, 0, 127),
];
console.log(exports.exampleSort[5] - exports.exampleSort[6]);
// const exampleSort2 = [
//   new RGB(255, 127, 0), // orange
//   new RGB(0, 255, 255), // mint
//   new RGB(127, 0, 255), // purple
//   new RGB(0, 255, 127), // spear-mint
//   new RGB(0, 127, 255), // light blue
//   new RGB(255, 0, 127), // magenta
//   new RGB(0, 255, 0), // green
//   new RGB(255, 0, 255), // pink
//   new RGB(255, 0, 0), // red
//   // new RGB(255, 255, 0), // yellow
//   new RGB(127, 255, 0), // lime
//   new RGB(0, 0, 255), // blue
//   new RGB(255, 127, 127), // magenta
// ]
// const nRGBS: RGB[] = [];
// rgbs.map((i) => {
//   nRGBS.push(i.rgb);
// })
// console.log(nRGBS);
// example sorting print
var exampleSort2 = [];
for (var i = 0; i < 9000; i++) {
    var r = Math.floor(Math.random() * 255);
    var g = Math.floor(Math.random() * 255);
    var b = Math.floor(Math.random() * 255);
    exampleSort2.push(new rgb_1.default(r, g, b));
}
var jlist = new jimplist2_1.default(exampleSort2.pop());
exampleSort2.map(function (rgb, i) {
    // console.log('-----------------------------------------------------------')
    // console.log(`${i} : ${rgb.print()}`)
    // console.log(`${i} : ${rgb.hslToString()}`)
    jlist.add(rgb);
});
// console.log();
// console.log();
// console.log();
// jlist.print();
// const jlist = new JimpList(new RGB(0, 255, 0))
// exampleSort.map((i) => {
//   jlist.add(i);
// })
//
// jlist.print();
