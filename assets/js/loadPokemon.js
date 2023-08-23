// pega o elemento que vamos inserir o pokemon
const loadPokemon = document.getElementById('loadPokemon')

// pega a url da pagina atual
const pagURL = window.location.href

// separa a parte relativa a atribuição
const splitURL = pagURL.split("=")

// define a variável id
let id = 0

// caso tenha ocorrido o split e ele seja maior que 1 ocorre um pop no id, caso não tenha o valor default será 1
if(splitURL.length > 1){
    id = splitURL.pop()
} else {
    id = 1
}

// define a url que para requisição
const url = `https://pokeapi.co/api/v2/pokemon/${id}`
console.log(url)

// função para pegar os detalhes do pokemon e retornar no HTML
function toLoadPokemon(url) {
    pokeApi.getPokemonDetail(url).then((pokemon = []) => {     
        const newHtml = 
            `<li>
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>
            <div class="detail">
                <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>
                <ol class="stats">
                        ${pokemon.stats.map((stat) => `<li class="">${stat}</li>`).join('')}
                </ol>
            <img src="${pokemon.photo}"
                alt="${pokemon.name}"> 
            </div>
        </li> 
        `
        loadPokemon.innerHTML += newHtml
    })
} 

// evento de load adicionado a tela para ao carregar chamar a função acima
window.addEventListener('load', () => {
    toLoadPokemon(url)
})
