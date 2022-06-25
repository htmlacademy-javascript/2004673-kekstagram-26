import { randomNumber } from './util';
import { getRandomArrayElement, NAMES, DESCRIPTIONS, MESSAGES } from './data';

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

const arrayLength = 25;

const photoArray = () => Array.from({length: arrayLength}, (_,i) => generatePhoto(i+ 1));

export {generatePhoto, photoArray};
