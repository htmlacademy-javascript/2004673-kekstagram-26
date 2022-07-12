import { photoArray } from './generate.js';

const body = document.querySelector('body');

//Элементы окна полноразмерного изображения

const bigPicture = document.querySelector('.big-picture');
const bigPictureCancel = bigPicture.querySelector('.big-picture__cancel');
const bigPictureSrc = bigPicture.querySelector('.big-pucture__img > img');
const bigPictureDescription = bigPicture.querySelector('.social__caption');
const bigPictureLike = bigPicture.querySelector('.likes__count');
const bigPictureCommentsCount = bigPicture.querySelector('.comments-count');


//Элементы комментариев к изображению

const socialCommentCount = bigPicture.querySelector('.social__comment-count');
const commentLoader = bigPicture.querySelector('.comments-loader');
const commentsBlock = bigPicture.querySelector('.social__comments');
const commentBlock = bigPicture.querySelector('.social__comment');

//Коллекция миниатюр
const pictureCollection = document.querySelectorAll('.picture');

//Закрытие окна полноразмерного изображения по клику иконки закрытия

bigPictureCancel.addEventListener('click', () => {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
});

//Закрытие окна полноразмерного изображения по нажатию Escape

document.addEventListener('keydown', (e) => {
  if(e.key === 'Escape') {
    bigPicture.classList.add('hidden');
    body.classList.remove('modal-open');
  }
});

let countMessage = 0;

pictureCollection.forEach((picture) => {
  const comments = photoArray[countMessage];

  //Создаем полноразмерное изображение по клику
  picture.addEventListener('click', () => {
    const commentsBlockFragment = document.createDocumentFragment();

    for(let i = commentsBlock.children.length - 1; i >= 0; i--) {
      const child = commentsBlock.children[i];
      child.parentElement.removeChild(child);
    }

    bigPicture.classList.remove('hidden');
    body.classList.add('modal-open');
    socialCommentCount.classList.add('hidden');
    commentLoader.classList.add('hidden');

    //Передаем данные в разметку
    bigPictureSrc.setAttribute('src', picture.querySelector('.picture__img'.src));
    bigPictureDescription.textContent = picture.querySelector('.picture__img').alt;
    bigPictureLike.textContent = picture.querySelector('.picture__likes').textContent;
    bigPictureCommentsCount.textContent = picture.querySelector('.picture__comments').textContent;

    //Генерируем блоки комментариев
    comments.forEach((comment) => {
      const cloneCommentBlock = commentBlock[0].cloneNode(true);

      cloneCommentBlock.querySelector('.social__comment > .social__picture').setAttribute('src', comment.avatar);
      cloneCommentBlock.querySelector('.social__comment > .social__picture').setAttribute('alt', comment.name);
      cloneCommentBlock.querySelector('.social__text').textContent = comment.message;

      commentsBlockFragment.appendChild(cloneCommentBlock);
    });
    commentsBlock.append(commentsBlockFragment);
  });
  countMessage++;
});
