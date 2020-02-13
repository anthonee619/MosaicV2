import JimpImage from './jimp-image';
import MNG from './MNG';
import { URLS } from './urls';
import { DATA } from './report.json';
// import JimpList from './jimplist';
// import JimpList from './jimplist2';
import JimpList from './jimplist3';
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


// ------------------Random rgb value Generator------------------
// Jimplist2 needs to be used for the jimplist
// const exampleSort2: RGB[] = [];
//
// for (let i = 0; i < 9000; i++) {
//   let r = Math.floor(Math.random() * 255);
//   let g = Math.floor(Math.random() * 255);
//   let b = Math.floor(Math.random() * 255);
//   exampleSort2.push(new RGB(r, g, b))
// }
//
// const jlist = new JimpList(exampleSort2.pop());
// exampleSort2.map((rgb, i) => {
//   jlist.add(rgb);
// })
// jlist.print();


async function switchToImg() {
  const root = new JimpImage(await JimpImage.read(URLS[0]))
  const child = new JimpImage(await JimpImage.read(URLS[1]))
  const jlist = new JimpList(root, await root.getAverageColor());
  await jlist.add(child);
  console.log(jlist);
}

switchToImg();
