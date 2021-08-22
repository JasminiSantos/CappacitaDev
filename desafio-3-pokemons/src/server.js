const express = require('express');
const app = express();
const dataBase = require('./dataBase');
const bodyParser = require('body-parser');
const { urlencoded } = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}))

app.get('/pokemons' , (req , res)=>{

   res.send(dataBase.mostrarPokemons());

});
app.get('/pokemons/:id' , (req , res)=>{

   res.send(dataBase.mostrarPokemon(req.params.id));

});
app.post('/pokemons' , (req , res)=>{
    let hp = Number(req.body.hp);

    if(!isNaN(hp)){
        const pokemon = dataBase.salvarPokemons({
            nome: req.body.nome,
            tipo: req.body.tipo,
            hp: Number(req.body.hp)
        });
        if(pokemon.hp > 100){
            pokemon.hp = 100;
        }
        res.send(pokemon);
    }
    else{
        res.status(500).send('Digite um número válido!')
    }
});

app.put('/pokemons/:id' , (req , res)=>{

    res.send(dataBase.curarPokemon(Number(req.params.id)));
 
 });

 app.delete('/pokemons/:id' , (req , res)=>{

    res.send(dataBase.deletarPokemon(Number(req.params.id)));
 
 });

app.listen(8000);