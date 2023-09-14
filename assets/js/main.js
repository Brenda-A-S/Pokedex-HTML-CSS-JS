let pokemonList = document.getElementById('pokemonList')
const input = document.getElementById('search')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 35
const limit = 20
let offset = 0;

function loadPokemonitens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map((pokemon) =>
            `<li class="fadeIn">
                <a href="details.html?id=${pokemon.id}" class="pokemon">
                <span class="number slideInDown">#${pokemon.number}</span>
                <h2 class="name slideInDown">${pokemon.name}</h2>
                <div class="detail">
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type slideInLeft ${type}">${type}</li>`).join('')}
                    </ol>
                <img src="${pokemon.photo}" alt="${pokemon.name}" width="156" height="144" class="slideInRight"> 
                </div>
            </a>
        </li> 
    `
        ).join('')
        pokemonList.innerHTML += newHtml

        input.oninput = () => {
            if (input.value.length > 0) {
                pokemonList.innerHTML = ""
            } else {
                pokemonList.innerHTML = newHtml
            }

            pokemons.forEach((pokemon) => {
                const pokeName = pokemon.name.toString();
                let adicionouPoke = false;
                let str = ''
                let inputValue = input.value.toLowerCase()

                for (let i = 0; i < pokeName.length; i++) {
                    str += pokeName[i]
                    if (inputValue.includes(pokeName[i]) && inputValue === str) {
                        console.log(str)
                        adicionouPoke = true;
                    }
                }
                if (adicionouPoke) {
                    const newHtml = `
                            <li class="fadeIn">
                                <a href="details.html?id=${pokemon.id}" class="pokemon">
                                    <span class="number slideInDown">#${pokemon.number}</span>
                                    <h2 class="name slideInDown">${pokemon.name}</h2>
                                    <div class="detail">
                                        <ol class="types">
                                            ${pokemon.types.map((type) => `<li class="type slideInLeft ${type}">${type}</li>`).join('')}
                                        </ol>
                                        <img src="${pokemon.photo}" alt="${pokemon.name}" width="156" height="144" class="slideInRight"> 
                                    </div>
                                </a>
                            </li> 
                        `
                    pokemonList.innerHTML += newHtml
                }
            }
            )
        }
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