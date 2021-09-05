const { databaseConnection } = require('./connection');

async function salvarPokemons(pokemon){
    const queryInsertPokemon = `INSERT INTO pokemons(nome_pokemon, tipo_pokemon) VALUES ('${pokemon.nome}','${pokemon.tipo}')`;
        
    const result = await databaseConnection.raw(queryInsertPokemon);

    if (result){
        return {
            nome: pokemon.nome,
            tipo: pokemon.tipo,
            id: result[0].insertId
        }
    }
    else{
        console.error('Deu erro!');
        
        return {
            error: "Deu erro na inserção"
        }
    }
}

async function mostrarPokemon(id){
    const querySelectPokemon = `SELECT * FROM pokemons WHERE id = ${id}`;
    const result = await databaseConnection.raw(querySelectPokemon);

    return result[0];
}

async function mostrarPokemons(){
    const querySelectPokemon = `SELECT * FROM pokemons`;
    const result = await databaseConnection.raw(querySelectPokemon);

    return result[0];
}

module.exports = {salvarPokemons, mostrarPokemon, mostrarPokemons};