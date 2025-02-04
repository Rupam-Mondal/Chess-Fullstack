import React, { useEffect, useState } from "react";
import { Chess } from "chess.js";
import { Chessboard } from "react-chessboard";
import { io } from "socket.io-client";

const socket = io("http://localhost:3000");

const ChessBoard = () => {
    const [game, setGame] = useState(new Chess());
    const [playerRole, setPlayerRole] = useState(null);

    useEffect(() => {
        const handlePlayerRole = (role) => setPlayerRole(role);
        const handleMove = (move) => {
            setGame((prevGame) => {
                const newGame = new Chess(prevGame.fen());
                newGame.move(move);
                return newGame;
            });
        };
        const handleBoardState = (fen) => setGame(new Chess(fen));

        socket.on("playerRole", handlePlayerRole);
        socket.on("move", handleMove);
        socket.on("boardState", handleBoardState);

        return () => {
            socket.off("playerRole", handlePlayerRole);
            socket.off("move", handleMove);
            socket.off("boardState", handleBoardState);
        };
    }, []);

    const onDrop = (sourceSquare, targetSquare) => {
        if (!playerRole || (game.turn() === "w" && playerRole !== "w") || (game.turn() === "b" && playerRole !== "b")) {
            return false; // If it's not the player's turn, prevent the move
        }

        const move = { from: sourceSquare, to: targetSquare };
        const newGame = new Chess(game.fen());

        if ((move.from.charAt(1) === '7' && game.turn() === 'w') || (move.from.charAt(1) === '2' && game.turn() === 'b')) {
            move.promotion = 'q'; // Handle promotion for pawns reaching the 8th or 1st rank
        }

        const result = newGame.move(move);

        if (result) {
            setGame(newGame); // Update the game state
            socket.emit("move", move); // Send move to the server
            socket.emit("boardState", newGame.fen()); // Sync the board state
        }

        return !!result; // If result is null, it means the move was invalid
    };

    return (
        <div className="flex flex-col items-center">
            <h2 className="text-white mb-4">You are playing as {playerRole === "w" ? "White" : "Black"}</h2>
            <Chessboard
                position={game.fen()}
                onPieceDrop={onDrop}
                boardOrientation={playerRole === "b" ? "black" : "white"}
                boardWidth={500}
            />
        </div>
    );
};

export default ChessBoard;
