import { arrayLength } from './data.js';
import { photoArray} from './generate.js';
import { openBigPicture } from './bigpicture.js';

const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const picturesList = document.querySelector('.pictures');
picturesList.classList.remove('.visually-hidden');

const renderPhoto = ({url, comments, likes, description}) => {
  const photoPreview = pictureTemplate.cloneNode(true);
  photoPreview.querySelector('.picture__img').src = url;
  photoPreview.querySelector('.picture__comments').textContent = comments.length;
  photoPreview.querySelector('.picture__likes').textContent = likes;
  photoPreview.addEventListener('click', (e) => {
    e.preventDefault();
    openBigPicture(url, likes, comments, description);
  });
  return photoPreview;
};

const renderPhotos = () => {
  const pictureListFragment = document.createDocumentFragment();
  const bigPicture = document.querySelector('.big-picture');
  const body = document.querySelector('body');
  photoArray.forEach((photo) => {
    pictureListFragment.appendChild(renderPhoto(photo));
  });
  picturesList.appendChild(pictureListFragment);
};

export {renderPhotos};


