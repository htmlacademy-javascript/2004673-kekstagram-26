function randomNumber(min, max) {
  if ((min < 0) || (max < 0) || (min === max)) {
    return -1;
  } else if (min > max) {
    [min, max] = [max, min];
  }
  const r = Math.random() * (max - min + 1) + min;
  return Math.floor(r);
}
const minNum = 0;
const maxNum = 11;
randomNumber(minNum, maxNum);


function checkRange(inputtxt, maxlength) {
  return (inputtxt.length <= maxlength) ? 1 :  -1;
}

let comment = 'Проверяемый комментарий';
const checkLength = 140;
checkRange(comment, checkLength);
comment = 'А это новый комментарий';
checkRange(comment, checkLength);
