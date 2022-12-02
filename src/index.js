import axios from 'axios';
const input = document.querySelector('input');
const form = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery')

form.addEventListener('submit', onInput);

async function onInput(evt) {
    evt.preventDefault();
    const searchItem = input.value;
    const URL = 'https://pixabay.com/api/';
    const params = {
        key: '31763935-81785faf577ab21332a77c6ed',
        q: searchItem,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
    };

    const result = await axios(URL, { params })
    console.log(result)
    renderPhotos(result.data.hits);
}

function renderPhotos(data) { 
    console.log(data)
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
}

