import express from 'express';
import { Server } from 'socket.io';
import cors from 'cors';
import http from 'http';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

// 1. Create server using http. 
const server = http.createServer(app);

// 2. Create socket server.
const io = new Server(server, {
	cors: {
		origin: '*',
		methods: ["GET", "POST"]
	}
});

// 3. Use socket events.
io.on('connection', (socket) => {
	console.log("Connection is established");

	socket.on("join", (data) => {
		socket.username = data;
	})

	socket.on("new_message", (message) => {

		let userMessage = {
			username: socket.username,
			message: message
		}

		// broadcast this message to all the clients.
		socket.broadcast.emit('broadcast_message', userMessage);
	})

	socket.on('disconnect', () => {
		console.log("Connection is disconnected");
	});
});

const port = process.env.PORT;

server.listen(port, () => {
	console.log(`App is listening on port ${port}`);
});
