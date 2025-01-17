import "./App.css"
import Board from "./components/Board";
import React, { useState } from "react";

function App() {
  const [history, setHistory] = useState([{ squares: Array(9).fill(null) }]);
  const [xIsNext,setXIsNext] = useState(true);
  const [stepNumber, setStepNumber] = useState(0);

  const current = history[stepNumber];
  

  const calculateWinner = (squares) => {
    const lines = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ];
    for(let index = 0; index < lines.length; index++) {
        const [a,b,c] = lines[index];
        if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;

  }
  

  let status;
  const winner = calculateWinner(current.squares); 
  if(winner){
      status = `Winner : `+ winner;
  }else{
      status = `Next Player ${xIsNext ? 'X' : 'O'}`;
  }

  const handleClick = (i) => {
    const newHistory = history.slice(0, stepNumber + 1);
    const newCurrent = newHistory[newHistory.length - 1];
    const newSquares = newCurrent.squares.slice();
    if(calculateWinner(newSquares) || newSquares[i]){
        return;
    }
    newSquares[i] = xIsNext? 'X' : 'O';
    setHistory([...newHistory, {squares: newSquares}]);
    setXIsNext(current => !current);
    setStepNumber(newHistory.length);
  }

  const moves = history.map((step,move) => {
    const asc = move ? `Go to move ${move}` : `Go to game start`;
    return (
      <li key={move}>
        <button className="move-button" onClick={() => {jumpTo(move)}}>{asc}</button>
      </li>
    )
  })

  const jumpTo = (move) => {
    setStepNumber(move);
    setXIsNext( (move % 2) === 0);
    setHistory(history.slice(0, move + 1));
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board 
        squares={current.squares} onClick={(i)=>handleClick(i)} />
      </div>
      <div className="board-info">
      <div className='status'>{status}</div>
      <ol style={{listStyle:"none"}}> 
        {moves}
      </ol>
      </div>
    </div>
  );
}

export default App;
