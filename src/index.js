import axios from 'axios';
import Notiflix from 'notiflix';
const input = document.querySelector('input');
const form = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery')
const loadButton = document.querySelector('.load-more')

const URL = 'https://pixabay.com/api/';
  const params = {
    key: '31763935-81785faf577ab21332a77c6ed',
    q:'',
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page: 1,
    per_page: 40,
};
  
form.addEventListener('submit', onInput);

async function onInput(evt) {
  gallery.innerHTML = '';
    
  evt.preventDefault();
  const searchItem = input.value;
  
  params.q = searchItem;

  const result = await axios(URL, { params } )
    

  if (!result.data.hits.length) {
    Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
  }
  renderPhotos(result.data.hits);

   
}

async function loadFunc() {
  params.page += 1;
    const result = await axios(URL, { params })
    console.log(result)
    
    renderPhotos(result.data.hits);
  }

   loadButton.addEventListener('click', loadFunc)

  

 



function renderPhotos(data) { 
    const markup = data.map(item => `<div class="photo-card">
  <img src="${item.webformatURL}" alt="${item.tags}" loading="lazy" class="image"/>
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
</div>`)
    gallery.insertAdjacentHTML('beforeend', markup)    
    loadButton.style.visibility = 'visible';
}