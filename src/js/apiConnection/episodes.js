export function episodes(){
    let api = ' https://rickandmortyapi.com/api/episode';

   return fetch(api)
        .then(response => response.json())
}