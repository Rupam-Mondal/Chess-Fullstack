function ChessplayerLogic(socket, io, chess, players, currPlayer){
    if(!players.white){
        players.white = socket.id;
        socket.emit("playerRole" , 'w');
    }
    else if(!players.black){
        players.black = socket.id;
        socket.emit("playerRole", 'b');
    }
    else{
        socket.emit("SpectatorRole");
    }

    socket.on('disconnect' , () => {
        if(socket.id == players.white){
            delete players.white;
        }
        else if (socket.id == players.black){
            delete players.black;
        }
    });

    move(socket, io, chess, players, currPlayer);
}

function move(socket, io, chess, players, currPlayer){
    socket.on('move' , (move) => {
        try {
            if(chess.turn() == 'w' && socket.id != players.white) return;
            if(chess.turn() == 'b' && socket.id != players.black) return;

            const res = chess.move(move);
            if(res){
                currPlayer = chess.turn();
                io.emit("move" , move);
                io.emit("boardState" , chess.fen());
            }
            else{
                console.log("Wrong move");
            }
        } catch (error) {
            console.log(error);
        }
    })
}

export default ChessplayerLogic;