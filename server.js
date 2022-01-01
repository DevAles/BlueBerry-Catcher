import express from 'express';
import http from 'http';
import { Server } from 'socket.io'
import game from './public/game.js'

const app = express();
const gamevar = game()

const server = http.createServer(app)
const sockets = new Server(server)
const canvas = gamevar.state.canvas

canvas.width = 10
canvas.height = 10
const random = Math.random()
console.log(random)

gamevar.subscribe(function(command){
    console.log('Emitting command: ' + command.type)
    sockets.emit(command.type, command)
})

sockets.on('connection', function(socket){
    const playerId = socket.id
    console.log('> Connected with Id: ' + playerId)
    gamevar.addPlayer({playerId})

    socket.emit('ready', gamevar.state)

    socket.on('set-timer',function(timer){
        gamevar.autoFruit(timer)
        console.log(timer)
    })
    socket.on('move-player', function(command){
        command.playerId = playerId
        command.type = 'move-player'

        gamevar.movePlayer(command)
    })

    socket.on('disconnect', function(){ 
        console.log('> Disconnected Id: ' + playerId)

        gamevar.removePlayer({playerId})
    })
})

app.use(express.static('public'))
server.listen(8080)