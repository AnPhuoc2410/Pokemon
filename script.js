let currentPokemon = {};
let score = 0;
let totalQuestions = 10;
let currentQuestion = 0;
const pokeApiUrl = 'https://pokeapi.co/api/v2/pokemon/';

async function fetchPokemon() {
    resetGame();

    const randomId = Math.floor(Math.random() * 898) + 1;
    const correctPokemon = await getPokemonData(randomId);
    currentPokemon = correctPokemon;

    // Fetch 3 incorrect Pokémon for multiple-choice options
    const choices = [correctPokemon];
    while (choices.length < 4) {
        const randomChoiceId = Math.floor(Math.random() * 898) + 1;
        if (!choices.some(pokemon => pokemon.id === randomChoiceId)) {
            const choice = await getPokemonData(randomChoiceId);
            choices.push(choice);
        }
    }

    // Shuffle choices
    choices.sort(() => Math.random() - 0.5);

    // Display the Pokémon silhouette and options
    document.getElementById('pokemon-image').src = correctPokemon.image;
    renderChoices(choices);
}

async function getPokemonData(id) {
    showLoadingSpinner();
    try {
        const response = await fetch(`${pokeApiUrl}${id}`);
        if (!response.ok) {
            throw new Error(`Pokémon with ID ${id} not found.`);
        }

        const data = await response.json();

        // Transform data into a more usable format
        return {
            id: data.id,
            name: data.name.charAt(0).toUpperCase() + data.name.slice(1),
            image: data.sprites.front_default || '',
            types: data.types.map(type => type.type.name).join(', '),
            abilities: data.abilities.map(ability => ability.ability.name).join(', '),
            stats: data.stats.map(stat => `${stat.stat.name}: ${stat.base_stat}`).join(', '),
            height: data.height,
            weight: data.weight,
            baseExperience: data.base_experience
        };
    } catch (error) {
        console.error(`Failed to fetch Pokémon data: ${error.message}`);
        alert(`Error: Unable to fetch Pokémon details. ${error.message}`);
        return {
            id: null,
            name: 'Unknown',
            image: '',
            types: 'Unknown',
            abilities: 'Unknown',
            stats: 'Unknown',
            height: 'Unknown',
            weight: 'Unknown',
            baseExperience: 'Unknown'
        };
    } finally {
        hideLoadingSpinner();
    }
}

function displayPokemonDetails(pokemon) {
    const detailsContainer = document.getElementById('pokemon-details');
    detailsContainer.innerHTML = `
        <strong>ID:</strong> ${pokemon.id}<br>
        <strong>Name:</strong> ${pokemon.name}<br>
        <strong>Types:</strong> ${pokemon.types}<br>
        <strong>Abilities:</strong> ${pokemon.abilities}<br>
        <strong>Stats:</strong> ${pokemon.stats}<br>
        <strong>Height:</strong> ${pokemon.height} decimeters<br>
        <strong>Weight:</strong> ${pokemon.weight} hectograms<br>
        <strong>Base Experience:</strong> ${pokemon.baseExperience}
    `;
}

function renderChoices(choices) {
    const choicesContainer = document.getElementById('choices-container');
    choicesContainer.innerHTML = '';
    choices.forEach(choice => {
        const button = document.createElement('button');
        button.className = 'choice-btn';
        button.textContent = choice.name;
        button.onclick = () => checkAnswer(choice.name);
        choicesContainer.appendChild(button);
    });
}

function checkAnswer(selectedName) {
    const buttons = document.querySelectorAll('.choice-btn');
    buttons.forEach(button => {
        button.disabled = true;
        if (button.textContent === currentPokemon.name) {
            button.classList.add('correct');
            score++;
            document.getElementById('pokemon-image').style.filter = 'none';
        } else if (button.textContent === selectedName) {
            button.classList.add('incorrect');
        }
    });

    document.getElementById('view-details-btn').style.display = 'block';
    updateScore();

    setTimeout(() => {
        document.getElementById('next-btn').style.display = 'block';
    }, 1000);
}

function updateScore() {
    document.getElementById('score').textContent = `Score: ${score}`;
    document.getElementById('progress-bar').style.width = `${(currentQuestion / totalQuestions) * 100}%`;
}

function resetGame() {
    document.getElementById('next-btn').style.display = 'none';
    document.getElementById('view-details-btn').style.display = 'none';
    document.getElementById('pokemon-image').style.filter = 'brightness(0)';
    currentQuestion++;
}

function showLoadingSpinner() {
    document.getElementById('loading-spinner').style.display = 'block';
}

function hideLoadingSpinner() {
    document.getElementById('loading-spinner').style.display = 'none';
}

document.getElementById('next-btn').onclick = fetchPokemon;
document.getElementById('view-details-btn').onclick = async () => {
    const pokemonDetails = await getPokemonData(currentPokemon.id);
    displayPokemonDetails(pokemonDetails);
};

// Initial fetch
fetchPokemon();
