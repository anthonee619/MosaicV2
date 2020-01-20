import JimpImage from './jimp-image';
import RGB from './rgb';

class JimpNode {
  //rgb = value later
  public value: number;
  public left: JimpNode | null;
  public right: JimpNode | null;
  public height: number;

  // constructor(image: JimpImage) {
  constructor(num: number) {
    this.value = num;
    this.left = null;
    this.right = null;
    this.height = 0;
  }

  toString(): string {
    // return `JimpNode-${this.value} height:${this.height}\nleft-${this.value}: ${this.left}\nright-${this.value}: ${this.right}`
    return `JimpNode-${this.value}`;
    // return "JimpNode-" + this.value;
  }

  public add(num: number) {
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
  }

  private setHeight(height: number) {
    this.height = height;
  }

}

export default class JimpList {
  public root: JimpNode;
  public sortedList: JimpNode[];

  constructor(num: number) {
    //will change to RGB class later
    this.root = new JimpNode(num);
    this.sortedList = [];
  }

  toString(): string {
    return `JimpList { \nroot: ${this.root.toString()} }`
  }

  valueOf(): string {
    return 'Value of';
  }

  public add(num: number) {
    this.root.add(num);
  }

  public inOrder(node: JimpNode) {
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
  }

  search(num: number, searchList: JimpNode[]): JimpNode {
    if (searchList.length % 2 === 1) {
      //Do something with odd
      let middle = ~~(searchList.length / 2);
      console.log(middle);
      if (searchList[middle].value === num) {
        return searchList[middle];
      } else if (searchList[middle].value > num) {
        return this.search(num, searchList.slice(0, middle));
      } else {
        return this.search(num, searchList.slice(middle + 1, searchList.length));
      }

    } else {
      //Do something with even
      let middle = ~~(searchList.length / 2);
      console.log(middle);
      if (searchList[middle].value === num) {
        return searchList[middle];
      } else if (searchList[middle - 1].value === num) {
        return searchList[middle - 1];
      } else if (searchList[middle].value < num) {
        return this.search(num, searchList.slice(0, middle));
      } else {
        return this.search(num, searchList.slice(middle, searchList.length));
      }

    }
  }
}
