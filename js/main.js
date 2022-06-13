function randomNumber(min, max) {
  if (min < 0) {
    return 'Недопустимое значение! Значения должны быть больше 0';
  } else if (max < 0) {
    return 'Недопустимое значение! Значения должны быть больше 0';
  } else if (min === max) {
    return 'Недопустимые значения! Значения должны разниться между собой!';
  } else if (min > max) {
    const temp = min;
    min = max;
    max = temp;
    const rand = Math.random() * (max - min + 1) + min;
    return Math.floor(rand);
  }
  const r = Math.random() * (max - min + 1) + min;
  return Math.floor(r);
}

const x = randomNumber(0,11);
console.log(x);


function checkRange(inputtxt, maxlength) {
  if(inputtxt.length <= maxlength)
  {
    return true;
  }
  return false;
}

const comment = 'Проверяемый комментарий';
const check = checkRange(comment, 140);
console.log(check);