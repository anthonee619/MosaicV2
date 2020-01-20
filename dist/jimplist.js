"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var JimpNode = /** @class */ (function () {
    // constructor(image: JimpImage) {
    function JimpNode(num) {
        this.value = num;
        this.left = null;
        this.right = null;
        this.height = 0;
    }
    JimpNode.prototype.toString = function () {
        // return `JimpNode-${this.value} height:${this.height}\nleft-${this.value}: ${this.left}\nright-${this.value}: ${this.right}`
        return "JimpNode-" + this.value;
        // return "JimpNode-" + this.value;
    };
    JimpNode.prototype.add = function (num) {
        if (this.value === num) {
            console.log("Same Values don't know what to do");
            //When its rgb it'll be added to a list
        }
        else if (this.value > num) {
            if (this.left != null) {
                this.setHeight(this.height + this.left.add(num));
            }
            else {
                this.left = new JimpNode(num);
                this.setHeight(this.height - 1);
                return -1;
            }
        }
        else {
            if (this.right != null) {
                this.setHeight(this.height + this.right.add(num));
            }
            else {
                this.right = new JimpNode(num);
                this.setHeight(this.height + 1);
                return 1;
            }
        }
        return 0;
    };
    JimpNode.prototype.setHeight = function (height) {
        this.height = height;
    };
    return JimpNode;
}());
var JimpList = /** @class */ (function () {
    function JimpList(num) {
        //will change to RGB class later
        this.root = new JimpNode(num);
        this.sortedList = [];
    }
    JimpList.prototype.toString = function () {
        return "JimpList { \nroot: " + this.root.toString() + " }";
    };
    JimpList.prototype.valueOf = function () {
        return 'Value of';
    };
    JimpList.prototype.add = function (num) {
        this.root.add(num);
    };
    JimpList.prototype.inOrder = function (node) {
        if (node.left != null) {
            this.inOrder(node.left);
        }
        if (node.value != null) {
            // console.log(node.value);
            this.sortedList.push(node);
        }
        if (node.right != null) {
            this.inOrder(node.right);
        }
    };
    JimpList.prototype.search = function (num, searchList) {
        if (searchList.length % 2 === 1) {
            //Do something with odd
            var middle = ~~(searchList.length / 2);
            console.log(middle);
            if (searchList[middle].value === num) {
                return searchList[middle];
            }
            else if (searchList[middle].value > num) {
                return this.search(num, searchList.slice(0, middle));
            }
            else {
                return this.search(num, searchList.slice(middle + 1, searchList.length));
            }
        }
        else {
            //Do something with even
            var middle = ~~(searchList.length / 2);
            console.log(middle);
            if (searchList[middle].value === num) {
                return searchList[middle];
            }
            else if (searchList[middle - 1].value === num) {
                return searchList[middle - 1];
            }
            else if (searchList[middle].value < num) {
                return this.search(num, searchList.slice(0, middle));
            }
            else {
                return this.search(num, searchList.slice(middle, searchList.length));
            }
        }
    };
    return JimpList;
}());
exports.default = JimpList;
