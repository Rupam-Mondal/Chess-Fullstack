import express from 'express';
import cors from 'cors';
import { Server } from 'socket.io';
import { createServer } from 'node:http';
import { Chess } from 'chess.js';
import ChessplayerLogic from './Controller/Player.js';

const app = express();
const server = createServer(app);
const io = new Server(server , {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});
const chess = new Chess();
let players = {};
let currPlayer = 'w';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get('/ping' , (req , res) => {
    return res.json({
        success:true,
        message:"Request received"
    })
});

io.on('connection', (socket) => {
    ChessplayerLogic(socket , io , chess , players , currPlayer);
});


server.listen(3000 , () => {
    console.log("Server is running")
})