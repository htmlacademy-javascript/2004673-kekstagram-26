import { randomNumber } from './util.js';
import { getRandomArrayElement, NAMES, DESCRIPTIONS, MESSAGES } from './data.js';

function generatePhoto(index) {
  return {
    id: index,
    url: `photos/${index}.jpg`,
    description: getRandomArrayElement(DESCRIPTIONS),
    likes: randomNumber(15,200),
    comment: {
      id: randomNumber(1,200),
      avatar: `img/avatar-${randomNumber(1,6)}.svg`,
      message: getRandomArrayElement(MESSAGES),
      name: getRandomArrayElement(NAMES)
    }
  };
}

const photoArray = (arrayLength) => Array.from({length: arrayLength}, (_,i) => generatePhoto(i+ 1));

export default generatePhoto;
export {photoArray};
