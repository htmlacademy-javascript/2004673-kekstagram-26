import {photoArray} from './generate.js';

const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const picturesList = document.querySelector('.pictures');
picturesList.classList.remove('visually-hidden');

const renderPhoto = ({url, comment, likes}) => {
  const photoPreview = pictureTemplate.cloneNode(true);
  photoPreview.querySelector('picture__img').src = url;
  photoPreview.querySelector('picture__comments').textContent = comment.length;
  photoPreview.querySelector('picture__likes').textContent = likes;
  return photoPreview;
};

const renderPhotos = () => {
  const pictureListFragment = document.createDocumentFragment();
  Object.keys(photoArray).forEach((photo) => {
    pictureListFragment.appendChild(renderPhoto(photo));
  });

  picturesList.appendChild(pictureListFragment);
};

export {renderPhotos};


