const NAMES = [
  'Морти',
  'Шаман',
  'Каспер',
  'Миха',
  'Вайс',
  'Грей',
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const DESCRIPTIONS = [
  'Отдыхаю с котиком.',
  'Мой песель самый лучший',
  'Морти - собака сутулая',
  'Не нравится - не смотри!',
  'Жизнь - штука тяжелая!',
  'Покойтесь с миром обои...',
];

const getRandomArrayElement = (elements) => elements[randomNumber(0, elements.length - 1)];

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

const photoArray = () => Array.from({length: 25}, (_,i) => generatePhoto(i+ 1));

photoArray();

function randomNumber(min, max) {
  if ((min < 0) || (max < 0) || (min === max)) {
    return -1;
  } else if (min > max) {
    [min, max] = [max, min];
  }
  const r = Math.random() * (max - min + 1) + min;
  return Math.floor(r);
}

const minNum = 15;
const maxNum = 200;
randomNumber(minNum, maxNum);

function checkRange(inputtxt, maxlength) {
  return (inputtxt.length <= maxlength) ? 1 :  -1;
}

let comment = 'Проверяемый комментарий';
const checkLength = 140;
checkRange(comment, checkLength);
comment = 'А это новый комментарий';
checkRange(comment, checkLength);
