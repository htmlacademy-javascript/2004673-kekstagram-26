import { randomNumber } from './util.js';
import { getRandomArrayElement, NAMES, DESCRIPTIONS, MESSAGES, arrayLength } from './data.js';

const comments = (index) => ({
  id: randomNumber(1,200),
  avatar: `img/avatar-${randomNumber(1,6)}.svg`,
  message: getRandomArrayElement(MESSAGES),
  name: getRandomArrayElement(NAMES)
});

const generateComments = Array.from({length: arrayLength}, (currentValue,i) => comments(i + 1));

const generatePhoto = (index) => ({
    id: index,
    url: `photos/${index}.jpg`,
    description: getRandomArrayElement(DESCRIPTIONS),
    likes: randomNumber(15,200),
    comments: generateComments,
});

const photoArray = Array.from({length: arrayLength}, (currentValue,i) => generatePhoto(i + 1));

export {photoArray};
