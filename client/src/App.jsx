import React, { useState, useEffect } from 'react';

const BOARD_SIZE = 15;

function createBoard() {
  return Array.from({ length: BOARD_SIZE }, () =>
    Array(BOARD_SIZE).fill('')
  );
}

function Board({ board }) {
  return (
    <table>
      <tbody>
        {board.map((row, i) => (
          <tr key={i}>
            {row.map((cell, j) => (
              <td style={{ width: 32, height: 32, border: '1px solid #999', textAlign: 'center' }} key={j}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function Lobby({ onCreateGame }) {
  return (
    <div>
      <h2>Lobby</h2>
      <button onClick={onCreateGame}>Create New Game</button>
      {/* Would list available games here */}
    </div>
  );
}

export default function App() {
  const [board, setBoard] = useState(createBoard());
  const [view, setView] = useState("lobby");

  const handleCreateGame = () => {
    setView("game");
    // Ideally, call API to start new game!
  };

  return (
    <div style={{ maxWidth: 700, margin: 'auto' }}>
      <h1>Grabble: Scrabble Online</h1>
      {view === "lobby" && <Lobby onCreateGame={handleCreateGame} />}
      {view === "game" && <Board board={board} />}
    </div>
  );
}