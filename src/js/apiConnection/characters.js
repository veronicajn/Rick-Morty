export function characters(){
    let api = ' https://rickandmortyapi.com/api/character';

    return fetch(api)
        .then(response => response.json())
}