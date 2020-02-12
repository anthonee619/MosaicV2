import JimpImage from './jimp-image';
import MNG from './MNG';
import { URLS } from './urls';
import { DATA } from './report.json';
// import JimpList from './jimplist';
import JimpList from './jimplist2';
import RGB from './rgb';

const newData = DATA.donations.map((item) => {
  return item.profile_image_url;
});

async function example() {
  const inputImage = new JimpImage(await JimpImage.read('./imgs/1.jpg'));
  const outputImageName = await new MNG(inputImage, newData).generate();
  console.log(`Final Mosaic Image was saved at location '${outputImageName}'`);
}

const rgbs = [
  { color: "black", rgb: new RGB(0, 0, 0) }, // black
  { color: "white", rgb: new RGB(255, 255, 255) }, // white
  { color: "red", rgb: new RGB(255, 0, 0) }, //red
  { color: "lime", rgb: new RGB(0, 255, 0) }, //lime
  { color: "blue", rgb: new RGB(0, 0, 255) }, // blue
  { color: "yellow", rgb: new RGB(255, 255, 0) }, // yellow
  { color: "cyan", rgb: new RGB(0, 255, 255) }, // cyan
  { color: "magenta", rgb: new RGB(255, 0, 255) }, // magenta
]

export const exampleSort = [
  new RGB(255, 0, 0), // red
  new RGB(255, 127, 0), // orange
  new RGB(255, 127, 127), // magenta
  new RGB(255, 255, 0), // yellow
  new RGB(127, 255, 0), // lime
  new RGB(0, 255, 0), // green
  new RGB(0, 255, 127), // spear-mint
  new RGB(0, 255, 255), // mint
  new RGB(0, 127, 255), // light blue
  new RGB(0, 0, 255), // blue
  new RGB(127, 0, 255), // purple
  new RGB(255, 0, 255), // pink
  new RGB(255, 0, 127), // magenta
]

// const exampleSort2 = [
//   new RGB(255, 127, 0), // orange
//   new RGB(0, 255, 255), // mint
//   new RGB(127, 0, 255), // purple
//   new RGB(0, 255, 127), // spear-mint
//   new RGB(0, 127, 255), // light blue
//   new RGB(255, 0, 127), // magenta
//   new RGB(0, 255, 0), // green
//   new RGB(255, 0, 255), // pink
//   new RGB(255, 0, 0), // red
//   // new RGB(255, 255, 0), // yellow
//   new RGB(127, 255, 0), // lime
//   new RGB(0, 0, 255), // blue
//   new RGB(255, 127, 127), // magenta
// ]

// const nRGBS: RGB[] = [];
// rgbs.map((i) => {
//   nRGBS.push(i.rgb);
// })
// console.log(nRGBS);

// example sorting print

const exampleSort2: RGB[] = [];

for (let i = 0; i < 9000; i++) {
  let r = Math.floor(Math.random() * 255);
  let g = Math.floor(Math.random() * 255);
  let b = Math.floor(Math.random() * 255);
  exampleSort2.push(new RGB(r, g, b))
}

const jlist = new JimpList(exampleSort2.pop());

exampleSort2.map((rgb, i) => {
  // console.log('-----------------------------------------------------------')
  // console.log(`${i} : ${rgb.print()}`)
  // console.log(`${i} : ${rgb.hslToString()}`)
  jlist.add(rgb);
})
// console.log();
// console.log();
// console.log();
jlist.print();

// const jlist = new JimpList(new RGB(0, 255, 0))
// exampleSort.map((i) => {
//   jlist.add(i);
// })
//
// jlist.print();
