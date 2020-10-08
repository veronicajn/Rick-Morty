import { modalCharacter, modalCloseCharacter, showIndividualChar, closeModalCharacter } from '../apiPaint/modalCharacter';
import {modalLocation, modalCloseLocation, showIndividualPlanet, closeModalLocation, showLocationResidents} from '../apiPaint/modalLocation';

import sigma from 'sigma';

export function loadHome(data) {
    paintCharacters(data)
    paintLocations(data);
    paintEpisodes(data);
}

export let s;

export function forEachResident(residents, func) {
    for(let resident of residents) {
        fetch(resident)
        .then(response => {
            response.json()
            .then(func)
        })
    }
}


export function  paintCharacters(data){
    //CARGAR LOS PERSONAJES----------------------------------------------------------------------------------------------
    let  personajes = data.Characters.results//seleccion de resultados de personajes
    let contenedor = document.querySelector('.card__section')// seleccion del conetenedor
    let template = document.querySelector('.character__card');//Cards
    let filters = document.querySelector('.filter__input')//seleccion filter
   

    //llamado de funciones y evento--------------------------------------------------------------------------------
    
    let filtro = document.querySelector('.filter__input')
    filtro.addEventListener("keyup", function(e){
       let count = filtro.value
       //llamado y ahora filtramos
       let resultadofiltro = filtrarinput(personajes, count)//array ya filtrado
       clearCharacter()
       recorrerPersonajes(resultadofiltro)
    });
    
    recorrerPersonajes(personajes)
    


    //FUNCION PARA PINTAR LAS IMÁGENES---------------------------------------------------------------
    function pintarImagen(resultado,template){
        const card = template.cloneNode(true)//clonado de card
        card.onclick = (event) => infoChar(resultado)
        card.classList.remove('inv__card_principal')//eliminar la clase para mostrar solo los clonados
        let imgNode = card.querySelector('.character__image')
        imgNode.src = resultado.image
        contenedor.appendChild(card)
        //Cargar nombre----------------------------------------------------------------------------------
        let namechar = card.querySelector('.character__name')
        namechar.innerHTML = resultado.name
        //Cargar location--------------------------------------------------------------------------------
        let locchar = card.querySelector('.character__location')
        locchar.innerHTML = resultado.location.name
        //cargar raza------------------------------------------------------------------------------------
        let razachar = card.querySelector('.character__species')
        razachar.innerHTML = resultado.species
    }

    //LIMPIAR LOS PERSONAJES  DEL CONTAINER -------------------------------------------------------------------------------------------------
    function clearCharacter() {// en este método se hará que se limpie de vacío el pokemon, lo utilizaremos en el método anterior
        let container = document.querySelector('.card__section')
        container.innerHTML = ''
    }

    //FILTRAR EL INPUT  DE LOS PERSONAJES--------------------------------------------------------------------------------
    function filtrarinput(personajes, valueinput){

        //hacer filter
        const filtrado = personajes.filter(itemvalue => itemvalue.name.toLowerCase().includes(valueinput.toLowerCase()))//includes ya es true o false, no hace falta if
        return filtrado
    //tolowercase   para escribir con minusculas

    }

    //for para recorrer los personajes y mostrar en el los input ------------------------------------------------------------
    function recorrerPersonajes(personajes) {
        for (let i = 0; i < personajes.length; i++) {//recorrido de personajes
            let resultado = personajes[i];
            pintarImagen(resultado, template)
        }
    }

    //METODO PARA EVENTO ONCLICK Y MOSTRAR INFO DE PERSONAJE---------------------------------------------------------------
    function infoChar(resultado){
        showIndividualChar(resultado)
    }
}

function paintEpisodes(data) {
    //VARIABLES GLOBALES---------------------------------------------------------------------------------------
    let episodes = data.Episodes.results
    let template = document.querySelector('.episodes__card');//Cards
    let contenedor = document.querySelector('.card__episodes')
    let conttemp1 = document.querySelector('.card__episodes__season1')
    let conttemp2 = document.querySelector('.card__episodes__season2')
    let filters = document.querySelector(".filter__input")//seleccion filter
    //---------------------------------------------------------------------------------------------------------
   
    //FUNCIÓN PINTAR EPISODIOS--------------------------------------------------------------
    function pintarEpisodios(resultado, template) {
        const card = template.cloneNode(true)//clonado de cards
        card.classList.remove('inv__card_principal2')//eliminar la clase para mostrar solo los clonados
        contenedor.appendChild(card)
        let titleEpisodes = document.querySelector('.s1');
        //pintar name-------------------
        let nameepisode = card.querySelector('.episode__name')
        nameepisode.innerHTML = resultado.name
        //pintar episode season----------------
        let episodenumber = card.querySelector('.episode__number')
        episodenumber.innerHTML = "Season:" + " " + resultado.episode
        let seasonposition = resultado.episode
        let episodiosLetras = seasonposition.split('')
        titleEpisodes.innerHTML = 'Seasons';

        if (episodiosLetras[2] === "2") {
            titleEpisodes.innerHTML = 'Season 2';
            conttemp2.appendChild(card)
            titleEpisodes.classList.add('s1--active');
        } else if (episodiosLetras[2] === "1") {
            titleEpisodes.innerHTML = 'Season 1';
            conttemp1.appendChild(card)
            titleEpisodes.classList.add('s1--active');
        }
        else {
            titleEpisodes.innerHTML = 'Seasons';
        }
        
        //pintar created----------------
        let created = card.querySelector('.episode__created')
        created.innerHTML = "Created:" + " " + resultado.created
        //pintar air-date---------------
        let airdate = card.querySelector('.episode__airdate')
        airdate.innerHTML = "Air:" + " " + resultado.air_date


        card.querySelector('.episode__characters').setAttribute('src', 'https://www.show.news/__export/1577056036726/sites/debate/img/2019/12/22/1_1_crop1577055768511.jpg_423682103.jpg')


    }
    //fin pintar episodios-----------------------------------------------------------------------------------------

    //LLAMAR FUNCIONES Y EVENTO--------------------------------------------------------------------------------
        let filtro = document.querySelector('.filter__input')
        filtro.addEventListener("keyup", function (e) {
            let count = filtro.value
            //llamado y ahora filtramos
            let resultadofiltro = filtrarinput(episodes, count)//array ya filtrado
            clearEpisodes()
            recorrerEpisodios(resultadofiltro)
        });

        recorrerEpisodios(episodes)
    //fin evento------------------------------------------------------------------------------------------------


    //FILTRAR EL INPUT  DE LOS EPISODIOS--------------------------------------------------------------------------------
    function filtrarinput(episodes, valueinput) {
        //hacer filter
        const filtrado = episodes.filter(itemvalue => itemvalue.name.toLowerCase().includes(valueinput.toLowerCase()))//includes ya es true o false, no hace falta if
        return filtrado
        //tolowercase   para escribir con minusculas

    }

    //LIMPIAR LOS PERSONAJES  DEL CONTAINER -------------------------------------------------------------------------------------------------
    function clearEpisodes() {// en este método se hará que se limpie de vacío el episodio
        let container = document.querySelector('.card__episodes__season1')
        let container2 = document.querySelector('.card__episodes__season2')
        container.innerHTML = ''
        container2.innerHTML = ''
    }

    //RECORRER LOS EPISODIOS---------------------------------------------------------------------------------------
    function recorrerEpisodios(episodes) {
        for (let i = 0; i < episodes.length; i++) {//recorrido de episodios
            let resultado = episodes[i];
            pintarEpisodios(resultado, template)
        }
    }
}

// LOCATIONS

function paintLocations(data) {
    let locations = data.Locations.results;
    let card;
    let mainContainer = document.querySelector('.locations');
    let template = document.querySelector('.card');
    let filter = document.querySelector('.filter__input');

    // Sigma

    s = new sigma ({
        renderer: {
            container: document.getElementById('sigma'),
            type: 'canvas'
        },
    
        settings: {
            minEdgeSize: 0.1,
            maxEdgeSize: 2,
            minNodeSize: 1,
            maxNodeSize: 8,
            drawLabels: false,
            borderSize: 2,
            defaultNodeBorderColor: '#f1f1f1'
        }
    });
    
    s.refresh();

    // Creamos la card y le insertamos los datos que vienen de la API

    const createIndividualLocation = (data) => {
        card = template.cloneNode('true');      
        card.onclick = (event) => showIndividualPlanet(data);
        card.classList.remove('card--hidden');
        card.querySelector('.card__image').setAttribute('src', 'https://images.pexels.com/photos/39561/solar-flare-sun-eruption-energy-39561.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260')
        card.querySelector('.location__name').innerHTML = data.name;
        card.querySelector('.location__residents').innerHTML = `Total residents: ${data.residents.length}`;
        card.querySelector('.location__dimension').innerHTML = data.dimension;
        mainContainer.appendChild(card);

        // Aplicamos los colores a las dimensiones
        colorDimension(data);

    }

    // Mostramos un color diferente por cada dimensión 

    function colorDimension(data) {
        if(data.dimension === 'unknown') {
            card.querySelector('.location__dimension').classList.add('location__dimension--red');
        }

        if(data.dimension === 'Dimension C-137') {
            card.querySelector('.location__dimension').classList.add('location__dimension--blue');
        }

        if(data.dimension === 'Replacement Dimension') {
            card.querySelector('.location__dimension').classList.add('location__dimension--purple');
        }

        if(data.dimension === 'Post-Apocalyptic Dimension') {
            card.querySelector('.location__dimension').classList.add('location__dimension--black');
        }

        if(data.dimension === 'Fantasy Dimension') {
            card.querySelector('.location__dimension').classList.add('location__dimension--yellow');
        }

        if(data.dimension === 'Cronenberg Dimension') {
            card.querySelector('.location__dimension').classList.add('location__dimension--green');
        }

        if(data.dimension === 'Dimension 5-126') {
            card.querySelector('.location__dimension').classList.add('location__dimension--white');
        }
    }

    // Recorremos el array de Locations y mostramos cada localización en el container principal

    const showIndividualLocation = (array) => {
        for(let item of array) {
            createIndividualLocation(item);
        }
    }

    showIndividualLocation(locations);

    // Mostramos los planetas con sigma 
    const showPlanetsSigma = (array) => {
        let paintedResidents = []
        
        for(let location of array) {
            s.graph.addNode({ 
                id: location.id,
                 label: location.name,
                x: Math.random(),
                y: Math.random(),
                size: 3,
                color: '#EE651D',
                data: location
            })

            s.refresh();
        }
        
        s.bind('clickNode', openLocationNode)
        
        function openLocationNode(event) {
            const location = event.data.node.data;
            //hacer drop node de cada residente de paintedsidents
            for(let resident of paintedResidents){
                s.graph.dropNode(resident)
                s.refresh();
            }
            paintedResidents = []

            forEachResident(location.residents, resident => {
                 //añadir el id residents  a paint residents
                paintedResidents.push(resident.name + ":"+ resident.id)

                s.graph.addNode({
                    id: resident.name + ":"+ resident.id,
                    label: resident.name,
                    x: Math.random(),
                    y: Math.random(),
                    size: 1,
                    color: '#ffffff',
                    data: resident
                })

                s.graph.addEdge({
                    id: `residente-${resident.name + ":"+ resident.id}`,
                    // Reference extremities:
                    source: location.id,
                    target: resident.name + ":"+ resident.id
                });
                    s.refresh();
            });
            console.log(paintedResidents)
        }
    }

    showPlanetsSigma(locations);

    // Limpiamos la sección principal antes de mostrar el filtrado

    const clearMainSection = () => {
        mainContainer.innerHTML = '';
    }

    // Filtramos las localizaciones con el input

    const searchLocation = () => {
        let filterValue = filter.value.toLowerCase();
        
        let filteredLocations = [];

        const filtered = locations.filter(location => {
            if(location.name.toLowerCase().includes(filterValue) || location.dimension.toLowerCase().includes(filterValue)) {
                filteredLocations.push(location);
            }
    
        })

        clearMainSection();
        showIndividualLocation(filteredLocations);
    }

    filter.onkeyup = searchLocation;
}