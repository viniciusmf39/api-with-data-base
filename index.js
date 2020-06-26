const express = require('express');
const database = require('./database.js');

const server = express();

server.use(express.json());

server.get('/',(req,res) =>{
    return res.json({result:'API-with-data-base'})
})

server.get('/users',async(req,res) =>{
    let users;

    await database.query('SELECT *from users_data', {type: database.QueryTypes.SELECT})
        .then(results =>{
            return res.json(results);
        }) . catch(err => {
            return res.json('erro ao buscar usuários');
        })
    return res.json({users})
})

server.post('/users', async (req,res) =>{
    
    let inseriu;
    const { id, name, age, phone, email } = req.body;

    await database.query(`INSERT INTO users VALUES (${id},'${name}', ${age}, '${phone}',' ${email}');`,
        {type:database.QueryTypes.INSERT})
        .then(result =>{
            inseriu = result
        }) 
        .catch(err =>{
            return res.json('erro ao inserir dado')
        })
    return res.json(inseriu);
});

server.listen(process.env.PORT);
