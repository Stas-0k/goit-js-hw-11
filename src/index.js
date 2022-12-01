const input = document.querySelector("input")


input.addEventListener('input', onInput)


function onInput() { 
    const inputSearch = input.value;
    fetch("https://pixabay.com/api/?key=31763935-81785faf577ab21332a77c6ed&image_type=photo&orientation=horizontal&safesearch=true&q=${inputSearch}")
}
