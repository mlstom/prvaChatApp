import { Server } from "socket.io"

export default function handlerSocketimport(req, res) {
    if (res.socket.server.io) {
        console.log('Socket is already running')
    } else {
        console.log('*First runnig, Socket is initializing')
        const io = new Server(res.socket.server)

        io.on('connection', socket => {
            socket.on('newMessage',msgs=>{
                socket.broadcast.emit('updatedMessages',msgs)
            })
        })
        
        res.socket.server.io = io
    }
    res.end()
}
export const config = {
    api: {
        bodyParser: false
    }
}