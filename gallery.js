import itemsInfo from './gallery-items.js'

const myGallery = document.querySelector('.js-gallery');
const modalBackdrop = document.querySelector('.js-lightbox');
const modalOverlay = document.querySelector('.lightbox__overlay');
const closeModalBtn = document.querySelector('.lightbox__button');
const modalBigImage = document.querySelector('.lightbox__image');

const galleryItemMarkup = createGalleryItem(itemsInfo);
myGallery.insertAdjacentHTML('beforeend', galleryItemMarkup);

function createGalleryItem(itemsInfo) {
    return itemsInfo.map(item => {
        const { preview, original, description } = item;
        return `
        <li class="gallery__item">
            <a class="gallery__link" href="${original}">
                <img
                  class="gallery__image"
                  src="${preview}"
                  data-source="${original}"
                  alt="${description}"/>
            </a>
        </li>`
        ;
    }).join('');
};

myGallery.addEventListener('click', onMyGalleryClick);

function onMyGalleryClick(event) {
    if (!event.target.classList.contains('gallery__image')) {
        return
    };
    event.preventDefault();
    addIsOpenClass();

    closeModalBtn.addEventListener('click', onCloseModalBtnClick);
    modalOverlay.addEventListener('click', onModalBackdropClick);
    modalBigImage.src = event.target.dataset.source;
    modalBigImage.alt = event.target.alt;
};

function addIsOpenClass() {
    if (!modalBackdrop.classList.contains('is-open')) {
        modalBackdrop.classList.add('is-open')
        window.addEventListener('keydown', onEscPress)
    };
};

function onCloseModalBtnClick() {
    window.removeEventListener('keydown', onEscPress)
    modalBackdrop.classList.remove('is-open');
    modalBigImage.src = '';
};

function onModalBackdropClick(event) {
    if (event.currentTarget === event.target) {
        onCloseModalBtnClick()
    }
};

function onEscPress(event) {
    const ESC_KEY_CODE = 'Escape'
    if (event.code === ESC_KEY_CODE) {
        onCloseModalBtnClick()
    }
    
};