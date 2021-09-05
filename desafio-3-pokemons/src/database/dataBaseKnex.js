const { databaseConnection } = require('./connection');

async function salvarPokemons(pokemon){
    const insertPokemon = {
        nome_pokemon: pokemon.nome,
        tipo_pokemon: pokemon.tipo
    }
    const result = await databaseConnection('pokemons').insert(insertPokemon);

    if (result){
        return {
            nome: pokemon.nome,
            tipo: pokemon.tipo,
            id: result[0]
        }
    }
    else{
        
        return {
            error: "Deu erro na inserção"
        }
    }
}

async function mostrarPokemon(id){
    const result = await databaseConnection('pokemons').where({ id });

    return result[0];
}

async function mostrarPokemons(){
    const result = await databaseConnection('pokemons');

    return result;
}

async function atualizarPokemon(id, pokemon){
    const updatePokemon = {
        nome_pokemon: pokemon.nome,
        tipo_pokemon: pokemon.tipo
    }
    const result = await databaseConnection('pokemons').where({ id }).update(updatePokemon);

    if (result){
        return {
            nome: pokemon.nome,
            tipo: pokemon.tipo,
            id: result[0]
        }
    }
    else{
        
        return {
            error: "Deu erro na inserção"
        }
    }
}

async function deletarPokemon(id){
    const result = await databaseConnection('pokemons').where({ id }).del();

    return result[0];
}


module.exports = {
    salvarPokemons, 
    mostrarPokemon, 
    mostrarPokemons, 
    atualizarPokemon, 
    deletarPokemon
};