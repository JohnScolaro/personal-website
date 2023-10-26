export function getRandomImageId(numOptions: number, except?: number) {
    let randomNum: number;
  
    do {
      randomNum = Math.floor(Math.random() * numOptions);
    } while (except !== undefined && randomNum === except);
  
    return randomNum;
  }
  
export function getImageFileFromImageId(imageId: number) {
    return imageId.toString() + ".png";
}

export function getImageUrlFromImageName(imageName: string) {
    return `/images/sketch-rank/${imageName}`;
}