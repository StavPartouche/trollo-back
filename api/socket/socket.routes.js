
module.exports = connectSockets;

function connectSockets(io) {
    io.on('connection', socket => {
        socket.on('userConnect', user => {
            socket.user = user;
            console.log(socket.user.userName + ' connected')
        })
        socket.on('enterBoard', boardId => {
            if (socket.boardId) {
                socket.leave(socket.boardId);
            }
            socket.join(boardId);
            socket.boardId = boardId;
            io.to(boardId).emit('enterBoard', socket.user)
        });
        socket.on('leaveBoard', () => {
            if (socket.boardId) {
                socket.leave(socket.boardId);
                socket.boardId = '';
            }
            const userName = (socket.user) ? socket.user.userName : 'guest';
            console.log(userName + ' left board')
            socket.user = null;
        })

        const boardEditEvs = ['boardName', 'removeBoardMember', 'addBoardMember', 'boardDesc', 'removeBoard',
            'addBoard', 'boardStyle', 'dragInBoard', 'removeList', 'addList', 'listName', 'checkListItem', 'checkList',
            'addTask', 'removeTask', 'taskMember', 'taskDueDate', 'taskName', 'taskDesc', 'uploadImg', 'attachment',
            'previewImg', 'comment', 'label', 'taskColor', 'log'];

        boardEditEvs.forEach(ev => {
            socket.on(ev, data => socket.to(socket.boardId).emit(ev, {type: ev, data}))
        })

        socket.on('disconnect', () => {
            console.log('user disconnected');
        });
    });
}