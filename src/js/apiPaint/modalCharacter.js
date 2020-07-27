// Mostramos al información de cada planeta individualmente
export let modalCharacter = document.querySelector('.modal-character');
export let modalCloseCharacter = document.querySelector('.modal-character__close');


export function showIndividualChar(resultado) {
    
      modalCharacter.classList.add('modal--show');
      modalCharacter.querySelector('.modal__image').setAttribute('src', resultado.image)
      modalCharacter.querySelector('.modal__name').innerHTML = resultado.name;
      modalCharacter.querySelector('.modal__status').innerHTML = resultado.status;
      modalCharacter.querySelector('.modal__species').innerHTML = resultado.species;
      modalCharacter.querySelector('.modal__gender').innerHTML = resultado.gender;
      modalCharacter.querySelector('.modal__location').innerHTML = resultado.location.name;
      
  }
  
  // Evento que cierra el modal una vez abierto
  
  export function closeModalCharacter() {
  
    modalCharacter.classList.remove('modal--show');
  }
  
  modalCloseCharacter.onclick = closeModalCharacter;
  
