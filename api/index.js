const express = require('express');
const { status } = require('express/lib/response');
const res = require('express/lib/response');
var cors = require('cors')

const config = require('../config.js');
const user = require('./components/user/network.js')

const app = express();
app.use(cors());
app.use(express.json());

//ROUTERS
app.use('/api/user', user)


//Servidor activo
app.listen(config.api.port, () => {
    console.log('Servidor corriendo en el puerto en el puerto =>', config.api.port)
}
);