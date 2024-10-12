console.log('Creating dynamic route');

App.get('/dynamic-endpoint', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    const data = {
        message: 'Este es un mensaje desde un endpoint dinámico!',
        timestamp: new Date(),
        status: 'success'
    };
    res.json(data);
});

App.get('/promise', (req, res) => {
    Promise.resolve().then(() => {
        res.setHeader('Content-Type', 'application/json');
        const data = {
            message: 'Este es el resultado de una promesa!',
            timestamp: new Date(),
            status: 'success'
        };
        res.json(data);
    });
})

App.get('/pokemon/:name', async (req, res) => {
    const name = req.params.name;

    const response = await Axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);

    res.setHeader('Content-Type', 'application/json');
    const data = {
        message: 'Este es el resultado de un endpoint con async/await!',
        pokemon: response.data.name,
        tipo: response.data.types[0].type.name,
        timestamp: new Date(),
        status: 'success'
    };
    res.json(data);
});