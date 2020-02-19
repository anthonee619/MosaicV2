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
var jimplist3_1 = __importDefault(require("./jimplist3"));
var mosaic_default_config_json_1 = require("./mosaic-default-config.json");
var MNG2 = /** @class */ (function () {
    function MNG2(image, urls, cellWidth, cellHeight, columns, rows, enableConsoleLogging) {
        if (enableConsoleLogging === void 0) { enableConsoleLogging = true; }
        // The images that will make up the final image (converted to cellWidth and cellHeight)
        this.jimpList = new jimplist3_1.default();
        // Index of best tile for a given cell
        this.tilesIndexMatrix = [];
        this.image = image;
        this.urls = urls;
        this.cellWidth = cellWidth ? cellWidth : mosaic_default_config_json_1.CONFIG.cell_width;
        this.cellHeight = cellHeight ? cellHeight : mosaic_default_config_json_1.CONFIG.cell_height;
        this.columns = columns ? columns : mosaic_default_config_json_1.CONFIG.columns;
        this.rows = rows ? rows : mosaic_default_config_json_1.CONFIG.rows;
        this.enableConsoleLogging = enableConsoleLogging;
        this._prepare();
    }
    MNG2.prototype._prepare = function () {
        var imageWidth = this.image.getWidth();
        var imageHeight = this.image.getHeight();
        var virtualCols = Math.ceil(imageWidth / this.cellWidth);
        var virtualRows = Math.ceil(imageHeight / this.cellHeight);
        //If calculated columns are greater than the default ones, we use the calculated sizes
        if (virtualCols > this.columns) {
            this.columns = virtualCols;
            this.rows = virtualRows;
        }
        else {
            //We recalculate columns or rows depending on the aspect ratio, because we are making the final image bigger
            if (this.image.getAspectRatio() > 1) {
                this.columns = Math.ceil(this.columns * this.image.getAspectRatio());
            }
            else if (this.image.getAspectRatio() < 1) {
                this.rows = Math.ceil(this.rows * (2 - this.image.getAspectRatio()));
            }
        }
        var finalImageWidth = this.cellWidth * this.columns;
        var finalImageHeight = this.cellHeight * this.rows;
        this.image.resize(finalImageWidth, finalImageHeight);
    };
    /**
     * Helps calculate progress percentajes
     * @param currentRow
     * @param totalRows
     */
    MNG2.prototype._calcProgress = function (current, total) {
        return Math.round(((current / total) * 100) * 100) / 100;
    };
    MNG2.prototype.getTiles = function (urls) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var _urls = urls ? urls : _this.urls;
            var numberOfTiles = _urls.length;
            if (numberOfTiles === 0) {
                throw new Error('There are no URLS');
            }
            if (_this.enableConsoleLogging)
                console.log(new Date().toString() + " - Reading tiles from URLS, " + numberOfTiles + " found...");
            var i = 0;
            asyncForEach(_urls, function (url) { return __awaiter(_this, void 0, void 0, function () {
                var img, image;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, jimp_image_1.default.read(url).catch(function (err) { if (_this.enableConsoleLogging)
                                console.log("Warning: abourting read of " + url); })];
                        case 1:
                            img = _a.sent();
                            if (this.enableConsoleLogging)
                                console.log(new Date().toString() + " - [Tiles read] " + i + "/" + numberOfTiles + ". Progress: " + this._calcProgress(i, numberOfTiles) + "%");
                            if (!img) return [3 /*break*/, 3];
                            image = new jimp_image_1.default(img);
                            image.resize(this.cellWidth, this.cellHeight);
                            return [4 /*yield*/, this.jimpList.add(image)];
                        case 2:
                            _a.sent();
                            _a.label = 3;
                        case 3:
                            i++;
                            if (i === numberOfTiles) {
                                if (this.enableConsoleLogging)
                                    console.log(new Date().toString() + " - Finished reading tiles.");
                                this.jimpList.sort();
                                resolve(this.jimpList);
                            }
                            return [2 /*return*/];
                    }
                });
            }); });
        });
    };
    return MNG2;
}());
exports.default = MNG2;
function asyncForEach(array, callback) {
    return __awaiter(this, void 0, void 0, function () {
        var i;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    i = 0;
                    _a.label = 1;
                case 1:
                    if (!(i < array.length)) return [3 /*break*/, 4];
                    return [4 /*yield*/, callback(array[i], i, array)];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3:
                    i++;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/];
            }
        });
    });
}
