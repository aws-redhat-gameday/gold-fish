const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3004;

http.createServer(function (request, response) {
    console.log('request starting...');

    var filePath = '.' + request.url;
    if (filePath == './')
        filePath = './index.html';

    var extname = path.extname(filePath);
    var contentType = 'text/html';
    switch (extname) {
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        case '.png':
            contentType = 'image/png';
            break;      
        case '.jpg':
            contentType = 'image/jpg';
            break;
    }

    fs.readFile(filePath, function(error, content) {
        response.writeHead(200, { 'Content-Type': contentType });
        response.end(content, 'utf-8');
    });

}).listen(PORT, () => console.log(`listening on http://localhost:${PORT}`));
