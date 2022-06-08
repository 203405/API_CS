const express = require('express');
const response = require('../../../network/response');

const {
    getConnection
} = require('../../../model/db');

const router = express.Router();

router.get('/success', function (req, res) {

    response.success(req, res, "", 200);

});

    //Login o Optener Usuarios.
router.post('/login', async function (req, res, next) {
    const client = await getConnection();
    console.log("Iniciando sesion");
    let username = req.body.username;
    let password = req.body.password;

    console.log(username);
    console.log(password);

    let sql = "select id, username, email, phone_number from client where username = '"+username+"' and password = '"+password+"'"
    console.log(sql);
    client.query(sql)
        .then(data => {
            console.log('Ok');
            res.send(data.rows);
        })
        .catch(e => {
            console.log('Error: ' + e.stack);
            res.send("error");
        })
});

router.get('/getAllUsers', async function (req, res) {
    const client = await getConnection();

    const query_request = {
        text: 'select * from client',
    };

    client.query(query_request)
        .then(r => {
            console.log(r.rows)
            //response.success(req, res, r.rows, 200);
            res.json(r.rows);
        })
        .catch(e => {
            console.log('Error: ' + e.stack);
            response.success(req, res, e.stack, 504);
        })
});


    //Registrar Usuarios.
router.post('/register', async function (req, res) {
    console.log("Registrando usuario");
    const client = await getConnection();
    let username = req.body.username;
    let email = req.body.email;
    let password = req.body.password;
    let phone_number = req.body.phone_number;
    console.log(username)
    console.log(password)
    console.log(email)
    console.log(phone_number)

    const query_request = {
        text: 'INSERT INTO public.client( username, email, password, phone_number) VALUES ($1, $2, $3, $4);',
        values: [username, email, password, phone_number]
    };

    client.query(query_request)
        .then(r => {
            console.log('ok');
            res.send("ok")
        })
        .catch(e => {
            res.send("nok")
            
        })
});


router.post('/update', async function (req, res) {
    console.log("Registrando usuario");
    const client = await getConnection();
    let Id = req.body.Id;
    let username = req.body.username;
    let email = req.body.email;
    let password = req.body.password;
    let phone_number = req.body.phone_number;
    console.log(Id)
    console.log(username)
    console.log(password)
    console.log(email)
    console.log(phone_number)

    let sql = "UPDATE client SET  username='"+username+"', email='"+email+"', password='"+password+"', phone_number='"+phone_number+"' WHERE id = "+Id+";";

    client.query(sql)
        .then(r => {
            console.log('ok');
            res.send("ok")
        })
        .catch(e => {
            res.send("nok")
            
        })
});

    //Borrar Usuarios
router.post('/delete', async function (req, res) {

    let Id = req.body.Id;
    console.log(Id);

    const client = await getConnection();
    const query_request = {
        text: `DELETE FROM client WHERE id=${Id}`,
    };

    client.query(query_request)
        .then(r => {
            res.send("ok");
        })
        .catch(e => {
            res.send("Nok");
            
        })

})

module.exports = router;