import Jimp from 'jimp';
import robot from 'robotjs';
import type { Position } from './types';

const screenShotDimension = 200;

const makeRobotjsBitmap = (mousePos: Position): robot.Bitmap => robot.screen.capture(
  mousePos.x - screenShotDimension / 2,
  mousePos.y - screenShotDimension / 2,
  screenShotDimension,
  screenShotDimension,
);

const fixColors = (image: robot.Bitmap): robot.Bitmap => {
  const fixedImage = { ...image };
  for (let i = 0; i < fixedImage.image.length; i += 4) {
    [fixedImage.image[i], fixedImage.image[i + 2]] = [
      fixedImage.image[i + 2],
      fixedImage.image[i],
    ];
  }
  return fixedImage;
};

const convertToBase64 = async (fixedImage: robot.Bitmap): Promise<string> => {
  const jimg = new Jimp(fixedImage.width, fixedImage.height);
  jimg.bitmap.data = fixedImage.image;
  return (await jimg.getBase64Async(Jimp.MIME_PNG)).split(',')[1]!;
};

export const getScreenShot = async (mousePos: Position): Promise<string> => {
  const image = makeRobotjsBitmap(mousePos);
  const fixedImage = fixColors(image);
  return convertToBase64(fixedImage);
};
