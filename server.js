const http = require('http');
const fs = require('fs');
const path = require('path');

// Define the port to run the server on
const port = 3000;

// Function to serve files
function serveFile(filePath, contentType, response) {
    fs.readFile(filePath, (err, data) => {
        if (err) {
            response.writeHead(500, { 'Content-Type': 'text/plain' });
            response.end('500 - Internal Error');
        } else {
            response.writeHead(200, { 'Content-Type': contentType });
            response.end(data);
        }
    });
}

// Create the server
const server = http.createServer((req, res) => {
    if (req.method === 'GET') {
        let filePath = path.join(__dirname, 'public', req.url === '/' ? 'index.html' : req.url);
        let extName = path.extname(filePath);
        let contentType = 'text/html';

        // Handle content type based on file extension
        switch (extName) {
            case '.js':
                contentType = 'text/javascript';
                break;
            case '.css':
                contentType = 'text/css';
                break;
            case '.json':
                contentType = 'application/json';
                break;
            case '.png':
                contentType = 'image/png';
                break;
            case '.jpg':
                contentType = 'image/jpg';
                break;
            case '.ico':
                contentType = 'image/x-icon';
                break;
        }

        // Serve the requested file
        serveFile(filePath, contentType, res);
    } else if (req.method === 'POST' && req.url === '/api/register') {
        // Handle API request for registration (dummy implementation)
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            // Process the registration (dummy processing)
            console.log('Received registration data:', body);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'User registered successfully' }));
        });
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 - Not Found');
    }
});

// Start the server
server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
