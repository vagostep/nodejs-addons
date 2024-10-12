console.log('Starting listeners');

Emitter.on('onLoad', (data) => {
    console.log(`After Server Load`);
});

Emitter.on('afterRegionSearched', (data) => {
    console.log(`After Region ${data} Search`);
});