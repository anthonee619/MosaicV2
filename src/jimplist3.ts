import JimpImage from './jimp-image';
import RGB from './rgb';

class JimpNode {
  public imgs: JimpImage[] = [];
  public rgb: RGB;
  public left: JimpNode | null;
  public right: JimpNode | null;

  constructor(img?: JimpImage, rgb?: RGB) {
    if (img != null) {
      this.imgs.push(img);
    }
    this.rgb = rgb ? rgb : new RGB(0, 0, 0);
    this.left = null;
    this.right = null;
  }

  async add(img: JimpImage, rgb?: RGB) {
    rgb = rgb ? rgb : await img.getAverageColor();
    if (this.rgb.equals(rgb) || this.rgb.bstSort(rgb) === 0) {
      this.imgs.push(img);
    } else if (this.rgb.bstSort(rgb) === -1) {
      //Value is less than
      if (this.left != null) {
        this.left.add(img, rgb);
      }
      else {
        this.left = new JimpNode(img, rgb);
      }
    } else if (this.rgb.bstSort(rgb) === 1) {
      if (this.right != null) {
        this.right.add(img, rgb);
      }
      else {
        this.right = new JimpNode(img, rgb);
      }
    }
  }

  print() {
    return `JimpImage{ imgs: ${this.imgs.length}, hsl: ${this.rgb.hslToString()}}`;
  }
}

export default class JimpList {
  public root: JimpNode | null;
  public sortedList: JimpNode[] = [];
  public length: number;

  constructor(img?: JimpImage, rgb?: RGB) {
    this.root = (img == null) || (rgb == null) ? null : new JimpNode(img, rgb);
    this.length = 0;
  }

  async add(img: JimpImage) {
    if (this.root == null) {
      this.root = new JimpNode(img, await img.getAverageColor());
    }
    else {
      await this.root.add(img);
    }
    this.length++;
  }

  sort() {
    if (this.root == null) {
      throw new Error('There is no root JimpNode for this JimpList');
    }
    this._sort(this.root);
  }

  _sort(node: JimpNode) {
    if (node.left != null) {
      this._sort(node.left);
    }
    this.sortedList.push(node);
    if (node.right != null) {
      this._sort(node.right);
    }
  }

  print() {
    if (this.sortedList.length === 0) {
      this.sort();
    }
    for (let i in this.sortedList) {
      console.log(`${i} - ${this.sortedList[i].print()}`);
    }
  }


}
