import JimpImage from './jimp-image';
import MNG from './MNG';
import MNG2 from './MNG2';
import { URLS } from './urls';
import { DATA } from './report.json';
// import JimpList from './jimplist';
// import JimpList from './jimplist2';
import JimpList from './jimplist3';
import RGB from './rgb';
import Jimp from 'jimp';

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

// const url = 'https://static-cdn.jtvnw.net/jtv_user_pictures/55e85d0b-fa97-42b6-acfe-34acb695d1df-profile_image-300x300.jpg';

async function switchToImg() {
  //Used to check if a JimpList can be created with urls
  const jlist = new JimpList();
  for (let i in URLS) {
    let child = await JimpImage.read(URLS[i]).catch((err) => console.log(`Error at ${i}`));
    await jlist.add(new JimpImage(child));
  }
  jlist.sort();
  console.log(jlist.sortedList.length);
  jlist.print();
}

// switchToImg();

async function mng2Test() {
  const inputImage = new JimpImage(await JimpImage.read('./imgs/1.jpg'));
  const mng2 = new MNG2(inputImage, newData);
  await mng2.generate();
}

mng2Test();
// example();

async function mng2Test2() {
  const inputImage = new JimpImage(await JimpImage.read('./imgs/1.jpg'));
  const mng2 = new MNG2(inputImage, URLS);
  await mng2.getTiles();
  mng2.jimpList.print();
  console.log(mng2.jimpList.bestTile(new RGB(77, 66, 60)));
}

// mng2Test2()
