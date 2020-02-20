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
    return `JimpNode{ imgs: ${this.imgs.length}, rgb: ${this.rgb.print()}}`;
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

  bestTile(rgb: RGB, searchList?: JimpNode[], bestNode?: any): JimpImage {
    let _searchList = searchList ? searchList : this.sortedList;
    let newBest = bestNode ? bestNode : { best: _searchList[0], diff: 100000000000 };
    if (_searchList.length != 1) {
      let middle = ~~(_searchList.length / 2);
      if (_searchList[middle].rgb.bstSort(rgb) === 0 || _searchList[middle].rgb.equals(rgb)) {
        return bestRandomImage(_searchList[middle]);
      }
      // checks to see if the search node is the best node so far
      let diff = _searchList[middle].rgb.getHSLDiff(rgb);
      calcBest(newBest, _searchList[middle], diff);

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
        let diff = _searchList[middle - 1].rgb.getHSLDiff(rgb);
        calcBest(newBest, _searchList[middle], diff);
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
    return bestRandomImage(newBest.best)

  }

}

function bestRandomImage(jn: JimpNode) {
  let index = Math.floor(Math.random() * jn.imgs.length);
  return jn.imgs[index];
}

function calcBest(best: any, challenger: JimpNode, diff: number): any {
  if (best.diff > diff) {
    console.log('---Calculted new Best---');
    return { best: challenger, diff: diff };
  }
  return best;
}
