const express = require('express');
const session = require('express-session');
const dataBase = require('./dataBaseKnex');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();	

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());


app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));


app.get('/login', function(req, res) {
	res.sendFile(path.join(__dirname, "..", 'frontend/pagina_login/index.html'));
	app.use(express.static(path.join(__dirname, "..", 'frontend/pagina_login')));
});

app.get('/cadastro', function(req, res) {
	res.sendFile(path.join(__dirname, "..", 'frontend/pagina_cadastro/index.html'));
	app.use(express.static(path.join(__dirname, "..", 'frontend/pagina_cadastro')));
});

app.post('/cadastro', async function(req,res){
	const account = await dataBase.cadastrar({
        username: req.body.username,
		email: req.body.email,
		password: req.body.password
    });

	if(account !== account.error){
		return res.status(200).redirect('/login');
	}
	else{
		res.status(401).send(account.error);
	}
});


app.post('/auth', async function(req, res) {
	const account = await dataBase.logar({
		email: req.body.email,
		password: req.body.password
    });

	if (account) {
        if (account.length > 0) {
            req.session.loggedin = true;
            req.session.email = account.email;
            return res.redirect('/filmes');
        } else {
            res.status(401).send('Senha ou usuário incorretos!');
        }	
	} else {
		res.status(401).send('Por favor, insira o usuário e senha!');
		res.end();
	}
});

app.get('/filmes',  function(req, res) {
	if (req.session.loggedin) {
		res.sendFile(path.join(__dirname, "..", 'frontend/pagina_filmes/index.html'));
		app.use(express.static(path.join(__dirname, "..", 'frontend/pagina_filmes')));

		
	} else {
		res.status(401).send('Por favor, faça login para acessar essa página!');
	}
});

app.listen(3000);	