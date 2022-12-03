import axios from 'axios';
import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
const input = document.querySelector('input');
const form = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const loadButton = document.querySelector('.load-more');

const URL = 'https://pixabay.com/api/';
const params = {
  key: '31763935-81785faf577ab21332a77c6ed',
  q: '',
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
  page: 1,
  per_page: 40,
};
let hits = 40;

form.addEventListener('submit', onInput);

async function onInput(evt) {
  gallery.innerHTML = '';
  hits = 40;
  evt.preventDefault();
  const searchItem = input.value;
  params.q = searchItem;
  const result = await axios(URL, { params });
   
  if (!result.data.hits.length) {
    loadButton.style.visibility = 'hidden';
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    return
  }
  
  renderPhotos(result.data.hits);  
}


  
async function loadFunc() {
  params.page += 1;
  const result = await axios(URL, { params });
  hits += result.data.hits.length
  renderPhotos(result.data.hits);
  scroll()
  Notiflix.Notify.info(`Hooray! We found ${hits} images.`);
  if (hits === result.data.totalHits) { 
    loadButton.style.visibility = 'hidden';
    Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
  }
}
loadButton.addEventListener('click', loadFunc);

function renderPhotos(data) {
  
  const markup = data.map(
    item => `<div class="photo-card">
    <a class="item-link" href=${item.largeImageURL}>
  <img src="${item.webformatURL}" alt="${item.tags}" loading="lazy" class="image"/></a>
  <div class="info">
    <p class="info-item">
      <b>Likes: </b>${item.likes}
    </p>
    <p class="info-item">
      <b>Views: </b>${item.views}
    </p>
    <p class="info-item">
      <b>Comments: </b>${item.comments}
    </p>
    <p class="info-item">
      <b>Downloads: </b>${item.downloads}
    </p>
  </div>
  
</div>`
  );
  
  gallery.insertAdjacentHTML('beforeend', markup);
  loadButton.style.visibility = 'visible';
  let gallerySimple = new SimpleLightbox('.item-link', { captionsData: "alt", captionDelay: 250 })
  gallerySimple.refresh();
}


function scroll() { 
  const { height: cardHeight } = document
  .querySelector(".gallery")
  .firstElementChild.getBoundingClientRect();

window.scrollBy({
  top: cardHeight * 2,
  behavior: "smooth",
});
}

