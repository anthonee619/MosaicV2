import JimpImage from './jimp-image';
import RGB from './rgb';

class JimpNode {
  public img: JimpImage[] = [];
  public rgb: RGB;
  public left: JimpNode | null;
  public right: JimpNode | null;

  constructor(rgb: RGB) {
    this.rgb = rgb;
    this.left = null;
    this.right = null;
  }

  print() {
    // return `JimpNode{ rgb: ${this.rgb.print()}}`
    return this.rgb.print();
  }

  public add(rgb: RGB) {
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
    } else {
      // new rgb is bigger than old
      if (this.right != null) {
        this.right.add(rgb);
      }
      else {
        this.right = new JimpNode(rgb);
      }
    }
  }
}

export default class JimpList {
  public root: JimpNode;
  public sortedList: JimpNode[] = [];

  constructor(rgb: RGB) {
    //will change to RGB class later
    this.root = new JimpNode(rgb);
  }

  print() {
    this.sort(this.root);
    this.sortedList.map((node, i) => {
      console.log(node.print());
    })
  }

  add(rgb: RGB) {
    this.root.add(rgb);
  }

  sort(node: JimpNode) {
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
  }

  bestNode() {
    if (this.sortedList.length === 0) {
      this.sort(this.root);
    }
    // this._search(node, this.sortedList)

  }

  private _search(node: JimpImage, searchTree: JimpNode[]) {

  }

}
