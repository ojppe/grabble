export async function createGame() {
  const response = await fetch('http://localhost:4000/api/games', {
    method: 'POST'
  });
  return response.json();
}

// Example WebSocket usage
let socket;
export function connect(gameId, onMessage) {
  socket = new WebSocket('ws://localhost:4000');
  socket.onopen = () => {
    console.log('WebSocket connected');
  };
  socket.onmessage = (event) => {
    const msg = JSON.parse(event.data);
    if (msg.gameId === gameId) {
      onMessage(msg);
    }
  };
}

export function sendMove(gameId, move) {
  if (socket && socket.readyState === WebSocket.OPEN) {
    socket.send(JSON.stringify({ gameId, move }));
  }
}