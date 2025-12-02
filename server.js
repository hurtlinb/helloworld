const http = require('http');
const { readFile } = require('fs');
const { join } = require('path');

const PORT = process.env.PORT || 3000;
const indexPath = join(__dirname, 'public', 'index.html');

const server = http.createServer((req, res) => {
  if (req.url === '/' || req.url === '/index.html') {
    readFile(indexPath, (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('Erreur interne du serveur.');
        return;
      }

      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(data);
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Page non trouvée.');
  }
});

server.listen(PORT, () => {
  console.log(`Serveur prêt sur http://localhost:${PORT}`);
});
