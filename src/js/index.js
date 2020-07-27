
//import "@babel/polyfill"

import { characters } from './apiConnection/characters';
import { locations } from './apiConnection/locations';
import { episodes } from './apiConnection/episodes';
import {loadHome} from './apiPaint/home';
import {filter, navCharacters, charactersContainer, locationsContainer, navLocations, navEpisodes, episodesContainer, showCharacters, showLocations, showEpisodes} from './mainNav';

import '../styles/main.scss';

const data = {}

function addData(key, d){
    data[key] = d
    if(Object.keys(data).length >= 3){
        onDataLoaded()
    }
}

characters().then(data => addData('Characters', data));
locations().then(data => addData('Locations', data));
episodes().then(data => addData('Episodes', data));


function onDataLoaded(){
    loadHome(data)
}