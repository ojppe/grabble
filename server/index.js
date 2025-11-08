const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

let games = [];
let nextGameId = 1;

// Minimal API to create a game
app.post('/api/games', (req, res) => {
  const game = { id: nextGameId++, board: Array(15).fill().map(() => Array(15).fill('')) };
  games.push(game);
  res.json(game);
});

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Broadcast move to all clients in same game
wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(data) {
    // Expect data: { gameId, move }
    try {
      let msg = JSON.parse(data);
      wss.clients.forEach(function each(client) {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify(msg));
        }
      });
    } catch (e) {}
  });
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));