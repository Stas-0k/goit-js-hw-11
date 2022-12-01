const input = document.querySelector("input")


input.addEventListener('input', onInput)


function onInput(e) { 
    const inputSearch = input.value;
    
    return fetch(`https://pixabay.com/api/?key=31763935-81785faf577ab21332a77c6ed&q=${inputSearch}&image_type=photo&orientation=horizontal&safesearch=true`)
}
