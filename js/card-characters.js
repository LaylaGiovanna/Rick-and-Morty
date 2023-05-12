const episodeSelect = document.getElementById("episode-select");
const charactersContainer = document.querySelector(".characters");
const filter = document.querySelector("#filter");
const episodeList = document.querySelector("#episode-list");
let episodes = [];

// function to fetch all episodes
async function fetchEpisodes() {
    const response = await fetch("https://rickandmortyapi.com/api/episode");
    const data = await response.json();
    const episodes = data.results;
    return episodes;
}

// function to fetch characters by episode id
async function fetchCharactersByEpisodeId(episodeId) {
    const response = await fetch(`https://rickandmortyapi.com/api/episode/${episodeId}`);
    const data = await response.json();
    const characterIds = data.characters.map((url) => url.split("/").pop());
    const characters = await Promise.all(
        characterIds.map(async (id) => {
            const response = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
            const data = await response.json();
            return data;
        })
    );
    return characters;
}

// function to create character card
function createCharacterCard(character) {
    const card = document.createElement("div");
    card.classList.add("character-card");

    const image = document.createElement("img");
    image.src = character.image;
    image.alt = `${character.name} image`;
    card.appendChild(image);

    const name = document.createElement("h2");
    name.textContent = character.name;
    card.appendChild(name);

    const status = document.createElement("p");
    status.classList.add("status");
    status.textContent = `Status: ${character.status}`;
    if (character.status === "Alive") {
        status.style.color = "green"; // set color to green for "Alive"
    } else if (character.status === "Dead") {
        status.style.color = "red"; // set color to red for "Dead"
    }
    card.appendChild(status);

    const location = document.createElement("p");
    location.textContent = `Location: ${character.location.name}`;
    card.appendChild(location);

    return card;
}


// function to render characters
function renderCharacters(characters) {
    charactersContainer.innerHTML = "";
    characters.forEach((character) => {
        const card = createCharacterCard(character);
        charactersContainer.appendChild(card);
    });
}

// initialize filter and render first episode characters
fetchEpisodes().then((episodes) => {
    const episodeOptions = episodes.map((episode) => {
        const option = document.createElement("option");
        option.value = episode.id;
        option.textContent = `Episode - ${episode.name}`;
        return option;
    });
    
    
    episodeSelect.append(...episodeOptions);
    

    const firstEpisodeId = episodes[0].id;
    fetchCharactersByEpisodeId(firstEpisodeId).then((characters) => {
        renderCharacters(characters);
    });
});

// event listener for episode select change
episodeSelect.addEventListener("change", (event) => {
    const episodeId = event.target.value;
    fetchCharactersByEpisodeId(episodeId).then((characters) => {
        renderCharacters(characters);
    });
});
