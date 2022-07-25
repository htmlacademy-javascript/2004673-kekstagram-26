import { clearContainer } from './util.js';
import { COMMENTS_TO_SHOW } from './data.js';

const commentTemplate = document.querySelector('#comment')
  .content
  .querySelector('.social__comment');
const bigPictureCommentElement = document.querySelector('.big-picture__social');
const captionElement = bigPictureCommentElement.querySelector('.social__caption');
const likesCountElement = bigPictureCommentElement.querySelector('.likes-count');
const commentCountElement = bigPictureCommentElement.querySelector('.social__comment-count');
const commentsCountElement = commentCountElement.querySelector('.comments-count');
const commentsListElement = bigPictureCommentElement.querySelector('.social__comments');
const loaderButtonElement = bigPictureCommentElement.querySelector('.comments-loader');
const commentsShownElement = commentCountElement.querySelector('.comments-count-shown');

const showComment = (comment) => {
  const commentFragment = document.createDocumentFragment();
  const commentElement = commentTemplate.cloneNode(true);
  const commentImgElement = commentElement.querySelector('img');
  commentImgElement.src = comment.avatar;
  commentImgElement.alt = comment.name;
  commentElement.querySelector('.social__text').textContent = comment.message;
  commentElement.classList.add('hidden');
  commentFragment.appendChild(commentElement);
  commentsListElement.appendChild(commentFragment);
};

const showComments = (object) => {
  object.comments.forEach((elem) => {
    showComment(elem);
  });
};

let commentsShown;

const loaderButtonShowHiddenCommentsHandler = () => {
  const commentsListItemsElement = commentsListElement.querySelectorAll('.social__comment');

  for(let j = 0; j< COMMENTS_TO_SHOW; j++){
    if(commentsShown === commentsListItemsElement.length) {
      loaderButtonElement.classList.add('hidden');
    }
    if(commentsShown < commentsListItemsElement.length) {
      commentsListItemsElement[commentsShown].classList.remove('hidden');
      commentsShown++;
    }
  }
  commentsShownElement.textContent = commentsShown;
};

const showAllComments = () => {
  commentsShown = 0;
  loaderButtonShowHiddenCommentsHandler();
};

const renderComments = (object) => {
  loaderButtonElement.classList.remove('hidden');
  captionElement.textContent = object.description;
  likesCountElement.textContent = object.likes;
  commentsCountElement.textContent = object.comments.length;
  clearContainer(commentsListElement);
  showComments(object);
  showAllComments();
  loaderButtonElement.addEventListener('click', loaderButtonShowHiddenCommentsHandler);
};

export {renderComments};

