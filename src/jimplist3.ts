import JimpImage from './jimp-image';
import RGB from './rgb';

class JimpNode {
  public imgs: JimpImage[] = [];
  public rgb: RGB;
  public left: JimpNode | null;
  public right: JimpNode | null;

  constructor(img: JimpImage, rgb: RGB) {
    this.imgs.push(img);
    this.rgb = rgb;
    this.left = null;
    this.right = null;
  }

  async add(img: JimpImage, rgb?: RGB) {
    rgb = rgb ? rgb : await img.getAverageColor();
    if (this.rgb.equals(rgb)) {
      // RGB Values are the same
      console.log(this.rgb);
      console.log(rgb);
      this.imgs.push(img);
    }
    else if (this.rgb.greaterThan(rgb)) {
      if (this.left != null) {
        this.left.add(img, rgb);
      }
      else {
        this.left = new JimpNode(img, rgb);
      }
    }
    else {
      if (this.right != null) {
        this.right.add(img, rgb);
      }
      else {
        this.right = new JimpNode(img, rgb);
      }
    }
  }
}

export default class JimpList {
  public root: JimpNode;
  public sortedList: JimpNode[] = [];

  constructor(img: JimpImage, rgb: RGB) {
    //will change to RGB class later
    this.root = new JimpNode(img, rgb);
  }

  add(img: JimpImage) {
    this.root.add(img);
  }

  // sort(node: JimpNode) {
  //   this.sortedList = [];
  //   if (node.left != null) {
  //     this.sort(node.left);
  //   }
  //   if (node.rgb != null) {
  //     this.sortedList.push(node);
  //   }
  //   if (node.right != null) {
  //     this.sort(node.right);
  //   }
  // }

}
