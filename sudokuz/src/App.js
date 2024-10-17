import React, { useState } from 'react';
import './App.css'; 

const App = () => {
  const initialBoard = Array(9).fill(null).map(() => Array(9).fill(''));
  const [board, setBoard] = useState(initialBoard);

  //TODO: Check for duplicates in rows, columns, and 3x3 blocks
  const checkForDuplicates = (newBoard) => {
    let duplicates = Array(9).fill(null).map(() => Array(9).fill(false));

    for (let i = 0; i < 9; i++) {
      let rowSet = new Set();
      let colSet = new Set();
      for (let j = 0; j < 9; j++) {
        // Check row
        if (newBoard[i][j] !== '' && rowSet.has(newBoard[i][j])) {
          duplicates[i][j] = true;
        } else {
          rowSet.add(newBoard[i][j]);
        }

        // Check column
        if (newBoard[j][i] !== '' && colSet.has(newBoard[j][i])) {
          duplicates[j][i] = true;
        } else {
          colSet.add(newBoard[j][i]);
        }
      }
    }

    //TODO: Check 3x3 subgrids for duplicates
    for (let row = 0; row < 9; row += 3) {
      for (let col = 0; col < 9; col += 3) {
        let blockSet = new Set();
        for (let i = row; i < row + 3; i++) {
          for (let j = col; j < col + 3; j++) {
            if (newBoard[i][j] !== '' && blockSet.has(newBoard[i][j])) {
              duplicates[i][j] = true;
            } else {
              blockSet.add(newBoard[i][j]);
            }
          }
        }
      }
    }

    return duplicates;
  };

  const handleChange = (row, col, value) => {
    if (!/^[1-9]?$/.test(value)) return; //TODO: Allow only digits 1-9 or empty input
    const newBoard = board.map((r, i) => r.map((c, j) => (i === row && j === col ? value : c)));
    setBoard(newBoard);
  };

  const duplicateMarkers = checkForDuplicates(board);

  return (
    <div className="sudoku-board">
      {board.map((row, i) =>
        row.map((value, j) => (
          <input
            key={`${i}-${j}`}
            type="text"
            value={value}
            onChange={(e) => handleChange(i, j, e.target.value)}
            className={`sudoku-cell ${duplicateMarkers[i][j] ? 'duplicate' : ''}`}
            style={{
              borderTop: i % 3 === 0 ? '2px solid black' : '',
              borderLeft: j % 3 === 0 ? '2px solid black' : '',
              borderBottom: i === 8 ? '2px solid black' : '',
              borderRight: j === 8 ? '2px solid black' : '',
            }}
          />
        ))
      )}
    </div>
  );
};

export default App;
