export let filter = document.querySelector('.filter__input');
export let navCharacters = document.querySelector('#navCharacters');
export let charactersContainer = document.querySelector('#charactersContainer');
export let navLocations = document.querySelector('#navLocations');
export let locationsContainer = document.querySelector('#locationContainer');
export let navEpisodes = document.querySelector('#navEpisodes');
export let episodesContainer = document.querySelector('#episodesContainer')



export function showCharacters() {
    locationsContainer.classList.remove('mainContent--show');
    episodesContainer.classList.remove('mainContent--show');
    charactersContainer.classList.add('mainContent--show');
    filter.placeholder = 'Busqueda de personajes...';
}

export function showLocations() {
    charactersContainer.classList.remove('mainContent--show');
    episodesContainer.classList.remove('mainContent--show');
    locationsContainer.classList.add('mainContent--show');
    filter.placeholder = 'Busqueda de localizaciones...';
}

export function showEpisodes() {
    locationsContainer.classList.remove('mainContent--show');
    charactersContainer.classList.remove('mainContent--show');
    episodesContainer.classList.add('mainContent--show');
    filter.value = '';
    filter.placeholder = 'Busqueda de espisodios...';
}


navCharacters.onclick = showCharacters;
navLocations.onclick = showLocations;
navEpisodes.onclick = showEpisodes;