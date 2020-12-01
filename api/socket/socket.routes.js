
module.exports = connectSockets;

function connectSockets(io) {
    io.on('connection', socket => {
        socket.on('userConnect', user => {
            socket.user = user;
            console.log(socket.user.userName + ' connected')
        })
        socket.on('leaveBoard', () => {
            if (socket.boardId) {
                socket.leave(socket.boardId);
                socket.boardId = '';
            }
            const userName = (socket.user) ? socket.user.userName : 'guest';
            console.log(userName + ' left board')
            socket.user = null;
        })
        socket.on('updateBoard', () => {
            socket.to(socket.boardId).emit('updateBoard')
        });

        socket.on('boardName', name => {console.log('boardddd'); socket.to(socket.boardId).emit('boardName', name)});
        socket.on('listName', data => {
            console.log('listtt'); socket.to(socket.boardId).emit('listName', data)});
        socket.on('removeBoardMember', id => socket.to(socket.boardId).emit('removeBoardMember', id));
        socket.on('addBoardMember', id => socket.to(socket.boardId).emit('addBoardMember', id));
        socket.on('removeBoard', id => socket.broadcast.emit('removeBoard', id));

        socket.on('enterBoard', boardId => {
            if (socket.boardId) {
                socket.leave(socket.boardId);
            }
            socket.join(boardId);
            socket.boardId = boardId;
            io.to(boardId).emit('enterBoard', socket.user)
        });
        socket.on('disconnect', () => {
            console.log('user disconnected');
        });
    });
}