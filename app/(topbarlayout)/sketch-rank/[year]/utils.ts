export function getRandomImageId(
  numOptions: number,
  except?: number | number[]
) {
  let randomNum: number;

  const excludedNumbers = Array.isArray(except) ? except : [except];

  do {
    randomNum = Math.floor(Math.random() * numOptions);
  } while (excludedNumbers.includes(randomNum));

  return randomNum;
}

export function getImageFileFromImageId(imageId: number) {
  return imageId.toString() + ".jpg";
}

export function getImageUrlFromImageName(year: string, imageName: string) {
  return `/images/sketch-rank/${year}/${imageName}`;
}
