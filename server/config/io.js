const runSocket = (io) => {
    io.on('connection', (socket) => {
        socket.emit('connection', 'Socket Connected!')

        socket.on('message', (text) => {
            console.log(text)
            socket.emit('message', {'text': '收到惹'})
        })
        setInterval(() => {
            socket.emit('connected', {'data': Math.random()})
        }, 1000)
    })
};


module.exports = runSocket;

