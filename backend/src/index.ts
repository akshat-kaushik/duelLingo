import express from 'express'
import { WebSocketServer } from 'ws'
import http from 'http'
import{userManager} from './managers/userManager'

const app = express()
const server = http.createServer(app)

const wss = new WebSocketServer({ server })

interface User {
  socket: WebSocket;
  name: string;
}

wss.on('connection', function connection(ws) {
    console.log('New client connected')
    ws.on('message', (data) => {
        console.log('Received message:', data.toString())
        userManager.addUsertoQueue({socket:ws,name:data.name},data.language)
    })

    ws.on('close', () => {
        console.log('Client disconnected')
    })

    ws.on('error', (error) => {
        console.error('WebSocket error:', error)
    })
})

app.get('/', (req, res) => {
    res.send('WebSocket server is running')
})

server.listen(3000, () => {
    console.log('Server started on http://localhost:3000')
    console.log('WebSocket server is running on ws://localhost:3000')
})



