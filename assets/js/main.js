const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 100
const limit = 20
let offset = 0;

function loadPokemonitens(offset, limit) {
    
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {        
        const newHtml = pokemons.map((pokemon) =>
            `<li>
                <a href="details.html?id=${pokemon.id}" class="pokemon">
                    <h2 class="name">${pokemon.name}</h2>
                    <span class="number">#${pokemon.number}</span>
                    <div class="detail">
                        <ol class="types">
                            ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                        </ol>
                    <img src="${pokemon.photo}" alt="${pokemon.name}"> 
                    </div>
                </a>
            </li> 
        `
        ).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonitens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit

    const qtdRecord = offset + limit

    if (qtdRecord >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonitens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonitens(offset, limit)
    }
})