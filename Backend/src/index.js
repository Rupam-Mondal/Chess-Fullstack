import express from 'express';
import cors from 'cors';
import { Server } from 'socket.io';
import { createServer } from 'node:http';

const app = express();
const server = createServer(app);
const io = new Server(server);

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
    console.log('a user connected');
});


server.listen(3000 , () => {
    console.log("Server is running")
})