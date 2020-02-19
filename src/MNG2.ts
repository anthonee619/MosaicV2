import JimpImage from './jimp-image';
import Image from './image';
import JimpList from './jimplist3';
import RGB from './rgb';
import { CONFIG } from './mosaic-default-config.json';

export default class MNG2 {
  // The output image that will be created as mosaic
  public image: Image;
  // The URL Paths to the images to be used in the mosaic
  public urls: string[];
  // The width in pixels of each cell of the final image
  public cellWidth: number;
  // The height in pixels of each cell of the final image
  public cellHeight: number;
  // The number of columns of the final image
  public columns: number;
  // The number of rows of the final image
  public rows: number;
  // The images that will make up the final image (converted to cellWidth and cellHeight)
  public jimpList: JimpList = new JimpList();
  // Index of best tile for a given cell
  public tilesIndexMatrix: number[][] = [];
  // Enables messages printed to the console
  public enableConsoleLogging: boolean;

  constructor(
    image: Image,
    urls: string[],
    cellWidth?: number,
    cellHeight?: number,
    columns?: number,
    rows?: number,
    enableConsoleLogging: boolean = true
  ) {
    this.image = image;
    this.urls = urls;
    this.cellWidth = cellWidth ? cellWidth : CONFIG.cell_width;
    this.cellHeight = cellHeight ? cellHeight : CONFIG.cell_height;
    this.columns = columns ? columns : CONFIG.columns;
    this.rows = rows ? rows : CONFIG.rows;
    this.enableConsoleLogging = enableConsoleLogging;
    this._prepare();
  }

  private _prepare() {
    let imageWidth = this.image.getWidth();
    let imageHeight = this.image.getHeight();
    let virtualCols = Math.ceil(imageWidth / this.cellWidth);
    let virtualRows = Math.ceil(imageHeight / this.cellHeight);

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

    let finalImageWidth = this.cellWidth * this.columns;
    let finalImageHeight = this.cellHeight * this.rows;
    this.image.resize(finalImageWidth, finalImageHeight);
  }

  /**
   * Helps calculate progress percentajes
   * @param currentRow
   * @param totalRows
   */
  private _calcProgress(current: number, total: number) {
    return Math.round(((current / total) * 100) * 100) / 100;
  }

  getTiles(urls?: string[]): Promise<JimpList> {
    return new Promise<JimpList>((resolve, reject) => {
      let _urls = urls ? urls : this.urls;
      let numberOfTiles = _urls.length;
      if (numberOfTiles === 0) {
        throw new Error('There are no URLS');
      }
      if (this.enableConsoleLogging) console.log(`${new Date().toString()} - Reading tiles from URLS, ${numberOfTiles} found...`);
      let i = 0;
      asyncForEach(_urls, async (url: any) => {
        let img = await JimpImage.read(url).catch((err) => { if (this.enableConsoleLogging) console.log(`Warning: abourting read of ${url}`) });
        if (this.enableConsoleLogging) console.log(`${new Date().toString()} - [Tiles read] ${i}/${numberOfTiles}. Progress: ${this._calcProgress(i, numberOfTiles)}%`);
        if (img) {
          let image: JimpImage = new JimpImage(img);
          image.resize(this.cellWidth, this.cellHeight);
          await this.jimpList.add(image);
        }
        i++
        if (i === numberOfTiles) {
          if (this.enableConsoleLogging) console.log(`${new Date().toString()} - Finished reading tiles.`);
          this.jimpList.sort();
          resolve(this.jimpList);
        }
      })
    })
  }

  processRowsAndColumns(rowStart: number, colStart: number, numRows: number, numCols: number): Promise<any> {
    return new Promise(async (resolve, reject) => {
      if (this.enableConsoleLogging) console.log(`${new Date().toString()} - Generating mosaic from (${rowStart}, ${colStart}) to (${rowStart + numRows}, ${colStart + numCols})`);
      for (let row = rowStart; row < numRows; row++) {
        const _processColsForRow = async (): Promise<any> => {
          console.log(`- ${new Date().toString()} - [Mosaic creation]. Progress: ${this._calcProgress(row, numRows)}%`);
          for (let col = colStart; col < numCols; col++) {
            // get the avg color of the current cell
            let imageAvgColor: RGB = await this.image.getAverageColor(col * this.cellWidth, row * this.cellHeight, this.cellWidth, this.cellHeight);
            // get the best tile for the cell
            let bestTile: JimpImage = this.jimpList.bestTile(imageAvgColor);
            // Composite the calculated best  tile in the final image
            this.image.composite(bestTile, col * this.cellWidth, row * this.cellHeight);
          }
          Promise.resolve();
        };
        await _processColsForRow();
      }
      resolve();
    });
  }

  generate(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      const _generate = async () => {
        await this.getTiles().catch((err) => Promise.reject((err)));
        if (this.jimpList.sortedList.length > 0) {
          await this.processRowsAndColumns(0, 0, this.rows, this.columns).catch((err) => Promise.reject(err));
          console.log('Saving mosaic image...');
          let outputImageName = await this.image.save().catch((err) => Promise.reject(err));
          if (this.enableConsoleLogging) console.log('Mosaic image saved! --> ' + outputImageName);
          resolve(outputImageName);
        }
        else {
          reject('Tiles were not loaded');
        }
      };
      _generate().catch((err) => { reject(err) });
    });
  }

}

async function asyncForEach(array: any[], callback: any) {
  for (let i = 0; i < array.length; i++) {
    await callback(array[i], i, array);
  }
}
