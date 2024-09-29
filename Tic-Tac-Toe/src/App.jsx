
import { useState } from 'react'
import './App.css'


function Square({value, onSquareClick}) {
  return(
    <button className='square-btn' onClick={onSquareClick}>{value}</button>
  )
}

function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  function handleClick(i){
    const nextSquares = squares.slice();
    if(xIsNext){
      nextSquares[i] = "X";
    }
    else{
      nextSquares[i] = "O"
    }
    setXIsNext(!xIsNext)
    setSquares(nextSquares);
  }
  return(
    <div className="board">
       <div className='board-row'>
        {squares.slice(0,3).map((square,index) => <Square key={index} value={square} onSquareClick={()=> handleClick(index)}/>)}
      </div>
      <div className='board-row'>
        {squares.slice(3,6).map((sqaure,index) => <Square key={index+3} value={sqaure} onSquareClick={()=> handleClick(index+3)}/>)}
      </div>
      <div className='board-row'>
        {squares.slice(6,9).map((square,index) => <Square key={index+6} value={square} onSquareClick={()=> handleClick(index+6)}/>)}
      </div>
    </div>
  )
}


function Game() {
  return(
      <div className="game">
          <Board/>
      </div>
  )
}

export default Game
