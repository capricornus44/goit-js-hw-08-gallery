import galleryItems from './gallery-items.js';

const refs = {
  galleryContainer: document.querySelector('.js-gallery'),
  modal: document.querySelector('.js-lightbox'),
  modalOverlay: document.querySelector('.lightbox__overlay'),
  modalContent: document.querySelector('.lightbox__content'),
  modalCurrentImage: document.querySelector('.lightbox__image'),
  modalCloseBtn: document.querySelector('button[data-action="close-lightbox"]'),
};
console.log(refs);

//Create nodes using reduce() and template string
const createGalleryNodes = galleryItems.reduce((acc, item, index) => {
  const galleryItem = `<li class="gallery__item">
  <a class="gallery__link" href="${item.original}">
      <img class="gallery__image" src="${item.preview}" data-source="${item.original}" alt="${item.description}" data-index="${index}">
  </a>
</li>`;
  acc += galleryItem;
  return acc;
}, '');

refs.galleryContainer.insertAdjacentHTML('beforeend', createGalleryNodes);

// ========================= Create nodes using template string, map() and join() ========================
// const createGalleryNode = ({ preview, original, description }, index) => {
//   return `<li class="gallery__item">
//   <a class="gallery__link" href="${original}">
//       <img class="gallery__image" src="${preview}" data-source="${original}" alt="${description}" data-index="${index}">
//   </a>
// </li>`;
// };

// const galleryNodes = galleryItems.map(createGalleryNode).join('');
// refs.galleryContainer.insertAdjacentHTML('beforeend', galleryNodes);
// ============================================= END ======================================================

// ================= Create nodes using map(), template string and join() Renewed version =================
// const createGalleryNodes = galleryItems
//   .map(({ preview, original, description }, index) => {
//     return `<li class="gallery__item">
//        <a class="gallery__link" href="${original}">
//            <img class="gallery__image" src="${preview}" data-source="${original}" alt="${description}" data-index="${index}">
//        </a>
//      </li>`;
//   })
//   .join('');

// refs.galleryContainer.insertAdjacentHTML('beforeend', createGalleryNodes);
// ============================================= END ======================================================

refs.galleryContainer.addEventListener('click', onModalOpen);
refs.modalCloseBtn.addEventListener('click', onModalClose);
refs.modalOverlay.addEventListener('click', onOverlayClick);

//Open full-size image in modal
function onModalOpen(event) {
  event.preventDefault();
  if (event.target.nodeName !== 'IMG') {
    return;
  }

  refs.modal.classList.add('is-open');

  refs.modalCurrentImage.src = event.target.dataset.source;
  refs.modalCurrentImage.index = event.target.dataset.index;
  //refs.modalCurrentImage.dataset.index = event.target.dataset.index;
  window.addEventListener('keydown', onKeyPress);
}

//Close modal by clicking on BUTTON
function onModalClose() {
  refs.modal.classList.remove('is-open');
  refs.modalCurrentImage.src = '';
  refs.modalCurrentImage.alt = '';

  window.removeEventListener('keydown', onKeyPress);
}

//Close modal by clicking on BACKDROP
function onOverlayClick(event) {
  if (event.currentTarget === event.target) {
    onModalClose();
  }
}

function onKeyPress(event) {
  const key = event.code;
  switch (key) {
    case 'Escape':
      onModalClose();
      break;
    case 'ArrowRight':
      onArrowRight();
      break;
    case 'ArrowLeft':
      onArrowLeft();
      break;
  }
}

function onArrowRight() {
  if (refs.modalCurrentImage.index + 1 === galleryItems.length) {
    refs.modalCurrentImage.index = 0;
  } else {
    refs.modalCurrentImage.index++;
  }
  refs.modalCurrentImage.src = galleryItems[refs.modalCurrentImage.index].original;
  refs.modalCurrentImage.alt = galleryItems[refs.modalCurrentImage.index].description;
}

function onArrowLeft() {
  if (refs.modalCurrentImage.index - 1 < 0) {
    refs.modalCurrentImage.index = galleryItems.length - 1;
  } else {
    refs.modalCurrentImage.index--;
  }
  refs.modalCurrentImage.src = galleryItems[refs.modalCurrentImage.index].original;
  refs.modalCurrentImage.alt = galleryItems[refs.modalCurrentImage.index].description;
}
