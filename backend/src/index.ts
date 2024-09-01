import express from 'express'
import { WebSocketServer } from 'ws'
import http from 'http'

const app = express()
const server = http.createServer(app)

const wss = new WebSocketServer({ server })

wss.on('connection', function connection(ws) {
    console.log('New client connected')

    

    ws.on('message', (message) => {
        console.log('Received message:', message.toString())
        wss.clients.forEach((client) => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(message.toString())
            }
        })
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



