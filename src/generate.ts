import JimpImage from './jimp-image';
import MNG from './MNG';
import { URLS } from './urls';
import { DATA } from './report.json';

const newData = DATA.donations.map((item) => {
  return item.profile_image_url;
});

async function example() {
  const inputImage = new JimpImage(await JimpImage.read('./imgs/1.jpg'));
  const outputImageName = await new MNG(inputImage, newData).generate();
  console.log(`Final Mosaic Image was saved at location '${outputImageName}'`);
}

example();
