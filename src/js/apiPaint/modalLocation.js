export let modalLocation = document.querySelector('.modal-locations');
export let modalCloseLocation = document.querySelector('.modal-locations__close');
let residentsContainer = document.querySelector('.modal__residents');

import {s, forEachResident} from './home';

export function showIndividualPlanet(data) {
    modalLocation.classList.add('modal-locations--show');
    modalLocation.querySelector('.modal__image').setAttribute('src', 'https://github.com/veronicajn/RickAndMorty/blob/master/dist/images/planet.png')
    modalLocation.querySelector('.modal__name').innerHTML = data.name;
    modalLocation.querySelector('.modal__type').innerHTML = data.type;
    showLocationResidents(data);
    
}
// Evento que cierra el modal una vez abierto
export function closeModalLocation() {
    modalLocation.classList.remove('modal-locations--show');
}

modalCloseLocation.onclick = closeModalLocation;

// Fetch de los residentes 

function showLocationResidents(data) {
    let residents = data.residents;
    
    residentsContainer.innerHTML = '';

    forEachResident(residents, createResident);
}

// Creamos la card de cada residente

function createResident(dataTwo) {
    let residentCard = document.querySelector('.modal__resident');
    let residentCardClone = residentCard.cloneNode(true);
    residentCardClone.classList.remove('modal__resident--hide');
    residentCardClone.querySelector('.modal__resident__image').setAttribute('src', dataTwo.image);
    residentCardClone.querySelector('.modal__resident__name').innerHTML =  dataTwo.name;
    residentsContainer.appendChild(residentCardClone);
}