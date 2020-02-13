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
var urls_1 = require("./urls");
var report_json_1 = require("./report.json");
// import JimpList from './jimplist';
// import JimpList from './jimplist2';
var jimplist3_1 = __importDefault(require("./jimplist3"));
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
// ------------------Random rgb value Generator------------------
// Jimplist2 needs to be used for the jimplist
// const exampleSort2: RGB[] = [];
//
// for (let i = 0; i < 9000; i++) {
//   let r = Math.floor(Math.random() * 255);
//   let g = Math.floor(Math.random() * 255);
//   let b = Math.floor(Math.random() * 255);
//   exampleSort2.push(new RGB(r, g, b))
// }
//
// const jlist = new JimpList(exampleSort2.pop());
// exampleSort2.map((rgb, i) => {
//   jlist.add(rgb);
// })
// jlist.print();
var url = 'https://static-cdn.jtvnw.net/jtv_user_pictures/55e85d0b-fa97-42b6-acfe-34acb695d1df-profile_image-300x300.jpg';
function switchToImg() {
    return __awaiter(this, void 0, void 0, function () {
        var root, _a, jlist, _b, _c, _loop_1, _d, _e, _i, i;
        return __generator(this, function (_f) {
            switch (_f.label) {
                case 0:
                    _a = jimp_image_1.default.bind;
                    return [4 /*yield*/, jimp_image_1.default.read(url)];
                case 1:
                    root = new (_a.apply(jimp_image_1.default, [void 0, _f.sent()]))();
                    _b = jimplist3_1.default.bind;
                    _c = [void 0, root];
                    return [4 /*yield*/, root.getAverageColor()];
                case 2:
                    jlist = new (_b.apply(jimplist3_1.default, _c.concat([_f.sent()])))();
                    _loop_1 = function (i) {
                        var child;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, jimp_image_1.default.read(urls_1.URLS[i]).catch(function (err) { return console.log(i); })];
                                case 1:
                                    child = _a.sent();
                                    jlist.add(new jimp_image_1.default(child));
                                    return [2 /*return*/];
                            }
                        });
                    };
                    _d = [];
                    for (_e in urls_1.URLS)
                        _d.push(_e);
                    _i = 0;
                    _f.label = 3;
                case 3:
                    if (!(_i < _d.length)) return [3 /*break*/, 6];
                    i = _d[_i];
                    return [5 /*yield**/, _loop_1(i)];
                case 4:
                    _f.sent();
                    _f.label = 5;
                case 5:
                    _i++;
                    return [3 /*break*/, 3];
                case 6:
                    console.log(jlist);
                    return [2 /*return*/];
            }
        });
    });
}
switchToImg();
