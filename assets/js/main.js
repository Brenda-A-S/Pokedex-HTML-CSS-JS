const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const modalcontainer = document.getElementById('modal-container')
const modal = document.getElementById('modal')

const maxRecords = 15
const limit = 10
let offset = 0;

function loadPokemonitens(offset, limit) {
    
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {        
        const newHtml = pokemons.map((pokemon) =>
            `<li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>
            <div class="detail">
                <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>
            <img src="${pokemon.photo}"
                alt="${pokemon.name}"> 
            </div>
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
