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

    move();
}

function move(socket, io, chess, players, currPlayer){
    
}

export default ChessplayerLogic;