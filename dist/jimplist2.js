"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var JimpNode = /** @class */ (function () {
    function JimpNode(rgb) {
        this.img = [];
        this.rgb = rgb;
        this.left = null;
        this.right = null;
    }
    JimpNode.prototype.print = function () {
        // return `JimpNode{ rgb: ${this.rgb.print()}}`
        return this.rgb.print();
    };
    JimpNode.prototype.add = function (rgb) {
        if (this.rgb.equals(rgb)) {
            console.log('-------------------Warning: RGB values are equal-------------------');
            console.log(rgb.print());
        }
        else if (this.rgb.greaterThan(rgb)) {
            // new rgb is smaller than old
            if (this.left != null) {
                this.left.add(rgb);
            }
            else {
                this.left = new JimpNode(rgb);
            }
        }
        else {
            // new rgb is bigger than old
            if (this.right != null) {
                this.right.add(rgb);
            }
            else {
                this.right = new JimpNode(rgb);
            }
        }
    };
    return JimpNode;
}());
var JimpList = /** @class */ (function () {
    function JimpList(rgb) {
        this.sortedList = [];
        //will change to RGB class later
        this.root = new JimpNode(rgb);
    }
    JimpList.prototype.print = function () {
        this.sort(this.root);
        this.sortedList.map(function (node, i) {
            console.log(node.print());
        });
    };
    JimpList.prototype.add = function (rgb) {
        this.root.add(rgb);
    };
    JimpList.prototype.sort = function (node) {
        this.sortedList = [];
        if (node.left != null) {
            this.sort(node.left);
        }
        if (node.rgb != null) {
            this.sortedList.push(node);
        }
        if (node.right != null) {
            this.sort(node.right);
        }
    };
    JimpList.prototype.bestNode = function () {
        if (this.sortedList.length === 0) {
            this.sort(this.root);
        }
        // this._search(node, this.sortedList)
    };
    JimpList.prototype._search = function (node, searchTree) {
    };
    return JimpList;
}());
exports.default = JimpList;
