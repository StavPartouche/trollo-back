
module.exports = connectSockets;

function connectSockets(io) {
    io.on('connection', socket => {
        socket.on('user connect', user => {
            console.log(user);
            socket.user = user;
            console.log(socket.user.userName + ' connected')
        })
        socket.on('user left board', () => {
            if (socket.boardId) {
                socket.leave(socket.boardId);
                socket.boardId = '';
            }
            console.log(socket.user.userName + ' left board')
            socket.user = null;
        })
        socket.on('update board', () => {
            socket.to(socket.boardId).emit('update board')
        });
        socket.on('enter board', boardId => {
            if (socket.boardId) {
                socket.leave(socket.boardId);
            }
            socket.join(boardId);
            socket.boardId = boardId;
            // console.log(board) 
            io.to(boardId).emit('user entered board', socket.user)
        });
        socket.on('disconnect', () => {
            console.log('user disconnected');
        });
    });
}