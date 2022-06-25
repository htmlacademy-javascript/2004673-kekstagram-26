function randomNumber(min, max) {
  if ((min < 0) || (max < 0) || (min === max)) {
    return -1;
  } else if (min > max) {
    [min, max] = [max, min];
  }
  const r = Math.random() * (max - min + 1) + min;
  return Math.floor(r);
}

function checkRange(inputtxt, maxlength) {
  return (inputtxt.length <= maxlength) ? 1 :  -1;
}

export {randomNumber, checkRange};
