import bindings from "bindings";
import express from "express";
import axios from "axios";
import EventEmitter from "node:events";

const V8 = bindings("V8");
const PORT = 3000;
const app = express();
const emitter = new EventEmitter();

global.App = app;
global.Axios = axios;
global.Emitter = emitter;

app.get('/open-server', (req, res) => {

    res.setHeader('Content-Type', 'application/json');
    const data = {
        message: 'Hola, este es un mensaje desde un endpoint estático!',
        timestamp: new Date(),
        status: 'success'
    };
    res.json(data);
});

app.get('/region/:name', async (req, res) => {
    const name = req.params.name;

    const response = await axios.get(`https://pokeapi.co/api/v2/region/${name}`);
    console.log()
    emitter.emit('afterRegionSearched', response.data.name);

    res.setHeader('Content-Type', 'application/json');
    const data = {
        message: 'Hola, este es un mensaje desde un endpoint estático!',
        region: response.data.name,
        timestamp: new Date(),
        status: 'success'
    };
    res.json(data);

});

V8.loadingExternalFiles(import.meta.dirname + '/endpoints.js');
V8.loadingExternalFiles(import.meta.dirname + '/events.js');

app.listen(PORT, () => {
    console.log(`Server listen on http://localhost:${PORT}`);
    emitter.emit('onLoad', true);
});