import JimpImage from './jimp-image';
import MNG from './MNG';
import { URLS } from './urls';
import { DATA } from './report.json';
import JimpList from './jimplist';
import RGB from './rgb';

const newData = DATA.donations.map((item) => {
  return item.profile_image_url;
});

async function example() {
  const inputImage = new JimpImage(await JimpImage.read('./imgs/1.jpg'));
  const outputImageName = await new MNG(inputImage, newData).generate();
  console.log(`Final Mosaic Image was saved at location '${outputImageName}'`);
}

// example();


// const bstInputs: number[] = [9, 6, 5, 3, 2, 4];
const bstInputs: number[] = [1, 7, 0, 3, 4];
// const bstInputs: number[] = [2, 1];

// const jl = new JimpList(7);
const jl = new JimpList(5);
// const jl = new JimpList(3);
// jl.add(9);
// jl.add(6);
// jl.add(5);

for (var i of bstInputs) {
  // console.log(i)
  jl.add(i);
  // console.log(jl.toString());
}

// console.log(jl.toString());
// console.log(jl);
// jl.inOrder(jl.root);
// console.log(jl.sortedList);
// console.log(jl.search(7, jl.sortedList).toString());
const rgb1 = new RGB(255, 254, 253);
const rgb2 = new RGB(255, 255, 254);
console.log(rgb1.getColorDistance(rgb2));
