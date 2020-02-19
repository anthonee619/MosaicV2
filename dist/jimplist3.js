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
var rgb_1 = __importDefault(require("./rgb"));
var bestJimp = /** @class */ (function () {
    function bestJimp(jn, diff) {
        this.jn = jn;
        this.diff = diff;
    }
    bestJimp.prototype.calcBest = function (newJN, newDiff) {
        if (this.diff > newDiff) {
            this.jn = newJN;
            this.diff = newDiff;
        }
    };
    return bestJimp;
}());
var JimpNode = /** @class */ (function () {
    function JimpNode(img, rgb) {
        this.imgs = [];
        if (img != null) {
            this.imgs.push(img);
        }
        this.rgb = rgb ? rgb : new rgb_1.default(0, 0, 0);
        this.left = null;
        this.right = null;
    }
    JimpNode.prototype.add = function (img, rgb) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!rgb) return [3 /*break*/, 1];
                        _a = rgb;
                        return [3 /*break*/, 3];
                    case 1: return [4 /*yield*/, img.getAverageColor()];
                    case 2:
                        _a = _b.sent();
                        _b.label = 3;
                    case 3:
                        rgb = _a;
                        if (this.rgb.equals(rgb) || this.rgb.bstSort(rgb) === 0) {
                            this.imgs.push(img);
                        }
                        else if (this.rgb.bstSort(rgb) === -1) {
                            //Value is less than
                            if (this.left != null) {
                                this.left.add(img, rgb);
                            }
                            else {
                                this.left = new JimpNode(img, rgb);
                            }
                        }
                        else if (this.rgb.bstSort(rgb) === 1) {
                            if (this.right != null) {
                                this.right.add(img, rgb);
                            }
                            else {
                                this.right = new JimpNode(img, rgb);
                            }
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    JimpNode.prototype.print = function () {
        return "JimpNode{ imgs: " + this.imgs.length + ", rgb: " + this.rgb.print() + "}";
    };
    return JimpNode;
}());
var JimpList = /** @class */ (function () {
    function JimpList(img, rgb) {
        this.sortedList = [];
        this.root = (img == null) || (rgb == null) ? null : new JimpNode(img, rgb);
        this.length = 0;
    }
    JimpList.prototype.add = function (img) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        if (!(this.root == null)) return [3 /*break*/, 2];
                        _a = this;
                        _b = JimpNode.bind;
                        _c = [void 0, img];
                        return [4 /*yield*/, img.getAverageColor()];
                    case 1:
                        _a.root = new (_b.apply(JimpNode, _c.concat([_d.sent()])))();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, this.root.add(img)];
                    case 3:
                        _d.sent();
                        _d.label = 4;
                    case 4:
                        this.length++;
                        return [2 /*return*/];
                }
            });
        });
    };
    JimpList.prototype.sort = function () {
        if (this.root == null) {
            throw new Error('There is no root JimpNode for this JimpList');
        }
        this._sort(this.root);
    };
    JimpList.prototype._sort = function (node) {
        if (node.left != null) {
            this._sort(node.left);
        }
        this.sortedList.push(node);
        if (node.right != null) {
            this._sort(node.right);
        }
    };
    JimpList.prototype.print = function () {
        if (this.sortedList.length === 0) {
            this.sort();
        }
        for (var i in this.sortedList) {
            console.log(i + " - " + this.sortedList[i].print());
        }
    };
    JimpList.prototype.bestTile = function (rgb, searchList, bestNode) {
        var _searchList = searchList ? searchList : this.sortedList;
        var newBest = bestNode ? bestNode : new bestJimp(_searchList[0], 100000000000);
        if (_searchList.length != 1) {
            var middle = ~~(_searchList.length / 2);
            if (_searchList[middle].rgb.bstSort(rgb) === 0 || _searchList[middle].rgb.equals(rgb)) {
                return bestRandomImage(_searchList[middle]);
            }
            // checks to see if the search node is the best node so far
            var diff = _searchList[middle].rgb.getColorDistance(rgb);
            newBest.calcBest(_searchList[middle], diff);
            if (_searchList.length % 2 === 1) {
                // odd
                if (_searchList[middle].rgb.bstSort(rgb) === -1) {
                    return this.bestTile(rgb, _searchList.splice(0, middle), newBest);
                }
                else if (_searchList[middle].rgb.bstSort(rgb) === 1) {
                    return this.bestTile(rgb, _searchList.splice(middle + 1, _searchList.length), newBest);
                }
            }
            else {
                // even
                if (_searchList[middle - 1].rgb.bstSort(rgb) === 0 || _searchList[middle - 1].rgb.equals(rgb)) {
                    return bestRandomImage(_searchList[middle - 1]);
                }
                else if (_searchList[middle].rgb.bstSort(rgb) === -1) {
                    return this.bestTile(rgb, _searchList.splice(0, middle), newBest);
                }
                else if (_searchList[middle].rgb.bstSort(rgb) === 1) {
                    return this.bestTile(rgb, _searchList.splice(middle, _searchList.length), newBest);
                }
            }
        }
        return bestRandomImage(newBest.jn);
    };
    return JimpList;
}());
exports.default = JimpList;
function bestRandomImage(jn) {
    var index = Math.floor(Math.random() * jn.imgs.length);
    return jn.imgs[index];
}
