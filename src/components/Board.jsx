import { useState } from "react";
import Cell from "./Cell";
import Tile from "./Tile";
import { Board } from "../helper";
import GameOverlay from "./GameOverlay";
import cloneDeep from "lodash.clonedeep";

const BoardComponent = () => {
  const [board, setBoard] = useState(new Board());

  const handleKeyDown = (e) => {
    e.preventDefault();

    if (board.hasWon()) return;
    let dir;
    switch (e.keyCode) {
      case 37:
      case 65:
        dir = 0;
        break;
      case 38:
      case 87:
        dir = 1;
        break;
      case 39:
      case 68:
        dir = 2;
        break;
      case 40:
      case 83:
        dir = 3;
        break;
      default:
        dir = 7;
    }

    if (dir !== 7) {
      let boardClone = cloneDeep(board);
      let newBoard = boardClone.move(dir);
      setBoard(newBoard);
    }
  };

  const resetGame = () => {
    setBoard(new Board());
  };

  return (
    <>
      <div className="details-box">
        <div className="resetButton" onClick={resetGame}>
          New Game
        </div>
        <div className="tips">
          Use W,A,S,D or the <br />
          arrow keys to move
        </div>
        <div className="score-box">
          <span className="score-header">
            Score:
            <br />
          </span>
          {board.score}
        </div>
      </div>
      <div className="board" tabIndex={0} onKeyDown={handleKeyDown}>
        {board.cells.map((row, index) => (
          <div key={index}>
            {row.map((col, colIndex) => (
              <Cell key={`${index}__${colIndex}`} />
            ))}
          </div>
        ))}
        {board.tiles
          .filter((tile) => tile.value !== 0)
          .map((tile, index) => (
            <Tile key={`${index}__tile`} tile={tile} />
          ))}
        <GameOverlay onRestart={resetGame} board={board} />
      </div>
    </>
  );
};

export default BoardComponent;
