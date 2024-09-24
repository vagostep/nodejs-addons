import bindings from "bindings";
import http from 'http';

const V8 = bindings("V8");
const PORT = 3000;

const server = http.createServer((req, res) => {

    // Definir los endpoints
    if (req.method === 'GET' && req.url === '/calculate-retirement') {

        const result = V8.calculateRetirement({age: 60, salary: 700});

        const name = "Andres";
        const HTML_TEMPLATE = `
        <!DOCTYPE html>
        <html lang='en'>
        <head>
            <meta charset='UTF-8'>
            <meta name='viewport' content='width=device-width, initial-scale=1.0'>
            <title>Calculate retirement</title>
        </head>
        <body>
            <h1>Calculate retirement</h1>
            <p>Hello, ${name}</p>
            <p>At age 65, you will receive a monthly pension of ${result}</p>
        </body>
        </html>
        `;

        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(HTML_TEMPLATE);
  
    } 
});

server.listen(PORT, () => {
    console.log(`Server listen on http://localhost:${PORT}`);
});