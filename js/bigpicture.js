import { photoArray } from './generate.js';

const body = document.querySelector('body');

const bigPicture = document.querySelector('.big-picture');
const bigPictureCancel = bigPicture.querySelector('.big-picture__cancel');
const socialCommentCount = bigPicture.querySelector('.social__comment-count');
const commentLoader = bigPicture.querySelector('.comments-loader');
const commentList = bigPicture.querySelector('.social__comments');

const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
};

const openBigPicture = (url, likes, comments, description) => {
  const arrayComments = [];

  bigPicture.classList.remove('hidden')
  body.classList.add('modal-open');

  bigPicture.querySelector('.big-picture__img img').src = url;
  bigPicture.querySelector('.big-picture__img img').alt = description;
  bigPicture.querySelector('.likes-count').textContent = likes;
  bigPicture.querySelector('.comments-count').textContent = comments.length;
  bigPicture.querySelector('.social__caption').textContent = description;

  comments.forEach(({avatar, name, message}) => {
    const socialComment = document.querySelector('.social__comment').cloneNode(true);
    socialComment.querySelector('.social__picture').src = avatar;
    socialComment.querySelector('.social__picture').alt = name;
    socialComment.querySelector('.social__text').textContent = message;
    arrayComments.push(socialComment);
  });

  while (commentList.firstChild) {
    commentList.removeChild(commentList.firstChild);
  };

  arrayComments.forEach((el, index) => {
    if(index > 4) {
      el.classList.add('hidden');
    }    
    commentList.append(el);
  });

  bigPictureCancel.addEventListener('click', () => {
    closeBigPicture();
  });

  document.addEventListener('keydown', (e) => {
    if(e.key === 'Escape') {
      e.preventDefault();
      closeBigPicture();
    }
  });

};

export {openBigPicture};