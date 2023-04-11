import React, { useState, useEffect } from "react";
import { Slot } from "./Slot";


export const Board = () => {
    // 6 rows, 7 columns
    // Could have done with a nested for loop but this way is more visual
    const [board, setBoard] = useState([
        ['', '', '', '', '', '', ''],
        ['', '', '', '', '', '', ''],
        ['', '', '', '', '', '', ''],
        ['', '', '', '', '', '', ''],
        ['', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '']
    ]);

    const [currPlayer, setCurrPlayer] = useState('X');
    const [oppPlayer, setOppPlayer] = useState('O');
    const [gameOver, setGameOver] = useState(false);


    const checkWin = (row, column, ch) => {
        // EXERCISE: This function does not cover all possible winning combinations. Edit the code to cover all possibilities. A working solution in C# (don't worry--if you know JavaScript you should understand most of it) exists at https://dotnetfiddle.net/FZGpbS Line #128
        try {
            if (board[row + 1][column] === ch) {
                if (board[row + 2][column] === ch) {
                    if (board[row + 3][column] === ch) {
                        return true;
                    }
                }
            }
        } catch (e) { console.log(e) }

        try {
            if (board[row + 1][column + 1] === ch) {
                if (board[row + 2][column + 2] === ch) {
                    if (board[row + 3][column + 3] === ch) {
                        return true;
                    }
                }
            }
        } catch (e) { console.log(e) }

        try {
            if (board[row + 1][column - 1] === ch) {
                if (board[row + 2][column - 2] === ch) {
                    if (board[row + 3][column - 3] === ch) {
                        return true;
                    }
                }
            }
        } catch (e) { console.log(e) }

        try {
            if (board[row][column + 1] === ch) {
                if (board[row][column + 2] === ch) {
                    if (board[row][column + 3] === ch) {
                        return true;
                    }
                }
            }
        } catch (e) { console.log(e) }

        try {
            if (board[row][column - 1] === ch) {
                if (board[row][column - 2] === ch) {
                    if (board[row][column - 3] === ch) {
                        return true;
                    }
                }
            }
        } catch (e) { console.log(e) }

        try {
            if (board[row - 1][column - 1] === ch) {
                if (board[row - 2][column - 2] === ch) {
                    if (board[row - 3][column - 3] === ch) {
                        return true;
                    }
                }
            }
        } catch (e) { console.log(e) }

        try {
            if (board[row - 1][column + 1] === ch) {
                if (board[row - 2][column + 2] === ch) {
                    if (board[row - 3][column + 3] === ch) {
                        return true;
                    }
                }
            }
        } catch (e) { console.log(e) }
    };

    const updateBoard = (row, column, ch) => {
        setBoard(prev => {
            const boardCopy = [...prev];
            boardCopy[row][column] = ch;
            return boardCopy;
        });
        return checkWin(row, column, ch);
    };


    const handleClick = (e) => {
        const column = e.target.getAttribute('x');
        let row = board.findIndex((rowArr, index) => {
            // Find the first row that is occupied or at the bottom of the board
            return (rowArr[column] !== '' || (index === board.length - 1));
        });
        // Only go up one row if the slot is NOT at the bottom
        if (row !== (board.length - 1)) row -= 1;
        if (board[row][column] !== '') row -= 1;



        setGameOver(updateBoard(row, column, currPlayer));


        if (!gameOver) {
            // Swap players
            const currPlayerCopy = currPlayer;
            setCurrPlayer(oppPlayer);
            setOppPlayer(currPlayerCopy);
        }

    };


    return (
        <>
            {gameOver && (
                <h1>Game Over! {oppPlayer == 'X' ? 'Red' : 'Black'} Wins!</h1>
            )}
            <h2 id='playerDisplay'>{currPlayer === 'X' ? 'Red' : 'Black'} Move</h2>
            <div id='board'
                onClick={gameOver ? null : handleClick}
            >

                {board.map((row, i) => {
                    return row.map((ch, j) => <Slot ch={ch} y={i} x={j} />);
                })}
            </div>
        </>
    );
};