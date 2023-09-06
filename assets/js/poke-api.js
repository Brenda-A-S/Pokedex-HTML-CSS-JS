
const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon()

    pokemon.id = pokeDetail.id

    // formatação dos números dos pokemons para o estilo #000
    let numberString = pokeDetail.id.toString()
    while (numberString.length < 3) {
        numberString = "0" + numberString
    }

    // atribuindo pokemon.number ao número formatado
    pokemon.number = numberString
    pokemon.name = pokeDetail.name

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type

    // mapeando todo o arry stats, para poder pegar as infos que quiser do slot do stat
    const stats = pokeDetail.stats.map((statSlot) => statSlot)
    
    const [stat] = stats

    pokemon.stats = stats
    pokemon.stat = stat

    pokemon.photo = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokeDetail.id}.png`
    return pokemon
}

// aqui fiz ele receber tanto a url do pokemon das listas quanto somente a url capturada pela página de detalhes
pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url || url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemonDetails = (pokemon) => {
    return fetch(pokemon)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonDetails) => pokemonDetails)
}


