const { databaseConnection } = require('./connection');

async function cadastrar(account){

    const insertAccount = {
        username: account.username,
		email: account.email,
		password: account.password
    }
    if(insertAccount.username && insertAccount.email && insertAccount.password){
        const result = await databaseConnection('accounts').insert(insertAccount);
	
        if (result) {

            return {
                id: result[0],
                username: account.username,
                email: account.email,
                password: account.password
            }
        }
        else{
            return {
                error: "Deu erro na inserção"
            }
        }
    }
    else{
        return {
            error: "Há campos não preenchidos!"
        }  
    }
}

async function logar(account){

    const result = await databaseConnection('accounts').where({
        email: account.email,
        password: account.password
    });

    return result;
}

module.exports = { cadastrar, logar };