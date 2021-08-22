const sequence = {
    _id: 1,
    get id(){return this._id++}
}

const pokemons = [];

function salvarPokemons(pokemon){
    if(!pokemon.id) pokemon.id = sequence.id;
    pokemons.push(pokemon);
    return pokemon;
}

function mostrarPokemon(id){
    return pokemons[id] || {}
}

function mostrarPokemons(){
    return Object.values(pokemons);
}

function curarPokemon(id){
    pokemons[id].hp += 20;
    if(pokemons[id].hp > 100){
        pokemons[id].hp = 100;      
    }
    return pokemons[id];
}

function deletarPokemon(id){
    sequence._id = sequence._id - 1;
    const pokemonDeletado = pokemons[id];

    pokemons.splice(id, 1);
    pokemons.forEach(pokemon => {
        if(pokemon.id > id){
            pokemon.id = pokemon.id - 1;
        }
    });
    return pokemonDeletado;
}

module.exports = {salvarPokemons, mostrarPokemon, mostrarPokemons, curarPokemon, deletarPokemon}