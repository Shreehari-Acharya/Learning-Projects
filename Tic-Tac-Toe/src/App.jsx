
import { useState } from 'react'
import './App.css'


function Square({value, onSquareClick, isWinning }) {
  const winning = isWinning();
  return(
    <button className={`square-btn ${winning ? 'winner-btn' : ''}`}  onClick={onSquareClick}>{value}</button>
  )
}

function Board({xIsNext, squares, onPlay, winningSquares}) {

  function isWinningSquare(i) {
    return winningSquares && winningSquares.includes(i); // Check if this square is part of the winning combination
  }
  
  function handleClick(i){
    if(squares[i] || calculateWinner(squares)){
      return;
    }
    const nextSquares = squares.slice();
    if(xIsNext){
      nextSquares[i] = "X";
    }
    else{
      nextSquares[i] = "O"
    }
    onPlay(nextSquares)
  }
  return(
    <div className="board">
       <div className='board-row'>
        {squares.slice(0,3).map((square,index) => <Square key={index} value={square} onSquareClick={()=> handleClick(index)} isWinning={() => isWinningSquare(index)} />)}
      </div>
      <div className='board-row'>
        {squares.slice(3,6).map((sqaure,index) => <Square key={index+3} value={sqaure} onSquareClick={()=> handleClick(index+3)} isWinning={() => isWinningSquare(index+3)} />)}
      </div>
      <div className='board-row'>
        {squares.slice(6,9).map((square,index) => <Square key={index+6} value={square} onSquareClick={()=> handleClick(index+6)} isWinning={()=> isWinningSquare(index+6)} />)}
      </div>
    </div>
  )
}


function Game() {
  
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0); // Track the current move index
  const xIsNext = currentMove % 2 === 0; // Determine whose turn it is

  const currentSquares = history[currentMove];

  const result = calculateWinner(currentSquares);  // Get the winner and the winning squares
  const winner = result ? result.winner : null;
  const winningSquares = result ? result.winningSquares : null; // Extract winning squares

  function handlePlay(nextSquares) {

    const nextHistory = history.slice(0, currentMove + 1); // Keep only history up to current move
    setHistory([...nextHistory, nextSquares]); // Add the new move
    setCurrentMove(nextHistory.length); // Move to the next step
  }

    // Undo a move
    function undo() {
      if (currentMove > 0) {
        setCurrentMove(currentMove - 1);
      }
    }

    // Redo a move
    function redo() {
      if (currentMove < history.length - 1) {
        setCurrentMove(currentMove + 1);
      }
    }

    function newGame() {
      setHistory([Array(9).fill(null)]);
      setCurrentMove(0);
    }

    
    let message;
    if (winner) {
      message = "Winner: " + winner
    } else if(currentMove == 9) {
      message = "Game Drawn!"
    }
    else{
      message = "Turn of: " + (xIsNext ? 'X' : 'O');
    }

  
  return(
    <div className="game">
      <div className="game-info">{message}</div>
      <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} winningSquares={winningSquares} />
      <div className='btns'>
        <button className="undo-btn" onClick={undo} disabled={currentMove === 0}>
          Undo
        </button>
        <button className='redo-btn' onClick={redo} disabled={currentMove === history.length - 1}>
          Redo
        </button>
      </div>
      <div>
        <button className='new-btn' onClick={newGame}>New Game</button>
      </div>
    </div>
  )
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], winningSquares: [a, b, c] };
    }
  }
  return null;
}
export default Game
