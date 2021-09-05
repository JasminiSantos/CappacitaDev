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
    return pokemons[id-1] || {}
}

function mostrarPokemons(){
    return Object.values(pokemons);
}

function curarPokemon(id){
    pokemons[id-1].hp += 20;
    if(pokemons[id-1].hp > 100){
        pokemons[id-1].hp = 100;      
    }
    return pokemons[id-1];
}
function atualizarPokemon(id, pokemon){
    pokemons[id] = pokemon;
    return pokemon;
}

function deletarPokemon(id){
    sequence._id = sequence._id - 1;
    const pokemonDeletado = pokemons[id-1];

    pokemons.splice(id-1, 1);
    pokemons.forEach(pokemon => {
        if(pokemon.id > id && id != 1){
            pokemon.id = pokemon.id - 1;
        }
    });
    return pokemonDeletado;
}

function batalhaPokemon(id1, id2){
    const superEfetivo = 40;
    const efetivo = 20;
    const naoEfetivo = 10;

    const pokemon1 = pokemons[id1-1];
    const pokemon2 = pokemons[id2-1];

    if(pokemon1.hp !== 0 && pokemon2.hp !== 0){
        if(pokemon1.tipo == pokemon2.fraqueza){
            pokemon2.hp -= superEfetivo;
        }
        else if(pokemon1.tipo == pokemon2.resistencia){
            pokemon2.hp -= naoEfetivo;
        }
        else{
            pokemon2.hp -= efetivo;
        }
    }
    if(pokemon1.hp < 0) pokemon1.hp = 0;
    if(pokemon2.hp < 0) pokemon2.hp = 0;

    return `${pokemon1.nome}: ${pokemon1.hp} / ${pokemon2.nome}: ${pokemon2.hp}`
}


module.exports = {salvarPokemons, mostrarPokemon, mostrarPokemons,atualizarPokemon,batalhaPokemon, curarPokemon, deletarPokemon}