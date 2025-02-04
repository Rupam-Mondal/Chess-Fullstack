import React, { useState } from "react";
import { Chess } from "chess.js";
import { Chessboard } from "react-chessboard";

function Board() {
    const [game, setGame] = useState(new Chess());

    const onDrop = (sourceSquare, targetSquare) => {
        const move = game.move({
            from: sourceSquare,
            to: targetSquare,
            promotion: "q", // Auto-promote to queen if needed
        });

        if (move) setGame(new Chess(game.fen())); // Update game state
    };

    return (
        <div className="w-96 h-96 flex justify-center items-center bg-gray-900">
            <Chessboard
                position={game.fen()}
                onPieceDrop={onDrop}
                boardWidth={384} // 96 * 4 pixels
            />
        </div>
    );
}

export default Board;
