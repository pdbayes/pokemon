(() => {
    // Define the relevant variables
    const buttonRefresh = document.querySelector('#refresh-pokedex-list');
    const apiRoot = 'https://pokeapi.co/api/v2';

    const capitalize = string => {
        const stringLength = string.length;

        return string.charAt(0).toUpperCase() +
            string.split('').splice(1, stringLength - 1).join('');

        return uppercase;
    };
    // Define the relevant functions
    getPokemonList = async (limit) => {
        const url = apiRoot + '/pokemon?limit=' + limit;
        const response = await fetch(url);
        const data = await response.json();
        return data;
    }

    getPokemonInfo = async (urlD) => {
        const response = await fetch(urlD);
        const data = await response.json();
        return data;
    }

    createPokemonList = data => {
        const pokedexListLength = data.length;
        const pokedexApp = document.querySelector('#pokedex-app');
        let pokedexList = document.querySelector('.pokedex-list');

        // Remove the list from the app, if it exists
        if (pokedexList) {
            pokedexApp.removeChild(pokedexList);
        }

        // Create the unordered list element and reassign the pokedexList variable
        pokedexList = document.createElement('ul');
        pokedexList.classList.add('pokedex-list');

        // Now create a list item for each item in the data array
        for (let i = 0; i < pokedexListLength; i++) {
            // Create the necessary items
            const pokedexItem = document.createElement('li');
            const pokedexItemName = document.createElement('span');
            const pokedexItemIcon = document.createElement('i');

            // Capitalize the pokemon's name and get its url
            const pokemonName = capitalize(data[i].name);
            const pokemonUrl = data[i].url;

            // Add the pokemon name and the ID to the created element
            pokedexItem.id = pokemonUrl;
            pokedexItemName.innerHTML = pokemonName;
            $(pokedexItem).on( "click", async function() {
                console.log("click");
                info = await getPokemonInfo(pokemonUrl);
                let piccy = info.sprites.front_shiny
                console.log(piccy)
    });

            // Add the relevant classes
            pokedexItem.classList.add('pokedex-list-item');
            pokedexItemIcon.classList.add('fas', 'fa-chevron-right');

            // Put the items together 
            pokedexItem.appendChild(pokedexItemName);
            pokedexItem.appendChild(pokedexItemIcon);

            // Then, add the item to the list 
            pokedexList.appendChild(pokedexItem);
        }

        // Finally, add the pokedexList back to the app
        pokedexApp.appendChild(pokedexList);
    };
    initialise = async () => {
        data = await getPokemonList(9);
        console.log(data)
        createPokemonList(data.results);
    };
    initialise();
    // Attach the functions to the DOM elements
    buttonRefresh.addEventListener('click', async () => {
        const data = await getPokemonList(9);
        console.log(data)
        createPokemonList(data.results);
    });
    
    


})();