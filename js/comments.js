import { clearContainer } from './util.js';
import { COMMENTS_TO_SHOW } from './data.js';

const commentTemplate = document.querySelector('#comment')
  .content
  .querySelector('.social__comment');
const bigPictureCommentContainer = document.querySelector('.big-picture__social');
const captionElement = bigPictureCommentContainer.querySelector('.social__caption');
const likesCount = bigPictureCommentContainer.querySelector('.likes-count');
const commentCount = bigPictureCommentContainer.querySelector('.social__comment-count');
const commentsCount = commentCount.querySelector('.comments-count');
const commentsList = bigPictureCommentContainer.querySelector('.social__comments');
const loaderButton = bigPictureCommentContainer.querySelector('.comments-loader');
const commentsShownElement = commentCount.querySelector('.comments-count-shown');

const showComment = (comment) => {
  const commentFragment = document.createDocumentFragment();
  const commentElement = commentTemplate.cloneNode(true);
  commentElement.querySelector('img').src = comment.avatar;
  commentElement.querySelector('img').alt = comment.name;
  commentElement.querySelector('.social__text').textContent = comment.message;
  commentElement.classList.add('hidden');
  commentFragment.appendChild(commentElement);
  commentsList.appendChild(commentFragment);
};

const showComments = (object) => {
  for (let i = 0; i< object.comments.length; i++) {
    showComment(object.comments[i]);
  }
};

let commentsShown;

const showHiddenComments = () => {
  const commentsListItems = commentsList.querySelectorAll('.social__comment');

  for(let j = 0; j< COMMENTS_TO_SHOW; j++){
    if(commentsShown === commentsListItems.length) {
      loaderButton.classList.add('hidden');
    }
    if(commentsShown < commentsListItems.length) {
      commentsListItems[commentsShown].classList.remove('hidden');
      commentsShown++;
    }
  }
  commentsShownElement.textContent = commentsShown;
};

const showAllComments = () => {
  commentsShown = 0;
  showHiddenComments();
};

const renderComments = (object) => {
  loaderButton.classList.remove('hidden');
  captionElement.textContent = object.description;
  likesCount.textContent = object.likes;
  commentsCount.textContent = object.comments.length;
  clearContainer(commentsList);
  showComments(object);
  showAllComments();
  loaderButton.addEventListener('click', showHiddenComments);
};

export {renderComments};

