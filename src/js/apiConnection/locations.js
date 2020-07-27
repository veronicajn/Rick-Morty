export function locations(){
    let api = ' https://rickandmortyapi.com/api/location';

    return fetch(api)
        .then(response => response.json())
}