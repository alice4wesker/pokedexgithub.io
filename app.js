const searchButton = document.getElementById("search-button");
const pokemonIdInput = document.getElementById("pokemon-id-input");
const pokemonInfo = document.getElementById("pokemon-info");

const fetchPokemonById = async (id) => {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        if (!response.ok) throw new Error("Pokémon not found");
        const data = await response.json();
        displayPokemon(data);
    } catch (error) {
        pokemonInfo.innerHTML = `<p id="error-message">${error.message}</p>`;
        pokemonInfo.style.display = "block"; // Show error message
    }
};

const displayPokemon = (pokemon) => {
    pokemonInfo.innerHTML = `
        <h2>${capitalizeFirstLetter(pokemon.name)} (#${pokemon.id})</h2>
        <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}" />
        <p>Type: ${pokemon.types.map(type => capitalizeFirstLetter(type.type.name)).join(', ')}</p>
        <p>Base Experience: ${pokemon.base_experience}</p>
    `;
    pokemonInfo.style.display = "block"; // Show Pokémon info
};

const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

searchButton.addEventListener("click", () => {
    const id = pokemonIdInput.value;
    if (id) {
        fetchPokemonById(id);
    }
});