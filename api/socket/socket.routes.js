
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

        socket.on('boardName', data => socket.to(socket.boardId).emit('boardName', {type: 'boardName', data}));
        socket.on('removeBoardMember', data => socket.to(socket.boardId).emit('removeBoardMember', {type: 'removeBoardMember', data}));
        socket.on('addBoardMember', data => socket.to(socket.boardId).emit('addBoardMember', {type: 'addBoardMember', data}));
        socket.on('boardDesc', data => socket.to(socket.boardId).emit('boardDesc', {type: 'boardDesc', data}));
        socket.on('removeBoard', data => socket.broadcast.emit('removeBoard', {type: 'removeBoard', data}));
        socket.on('boardStyle', data => socket.broadcast.emit('boardStyle', {type: 'boardStyle', data}));
        socket.on('removeList', data => socket.broadcast.emit('removeList', {type: 'removeList', data}));
        socket.on('addList', data => socket.broadcast.emit('addList', {type: 'addList', data}));
        socket.on('listName', data => socket.to(socket.boardId).emit('listName', {type: 'listName', data}));
        socket.on('checkListItem', data => socket.to(socket.boardId).emit('checkListItem', {type: 'checkListItem', data}));
        socket.on('checkList', data => socket.to(socket.boardId).emit('checkList', {type: 'checkList', data}));
        socket.on('addTask', data => socket.broadcast.emit('addTask', {type: 'addTask', data}));
        socket.on('removeTask', data => socket.broadcast.emit('removeTask', {type: 'removeTask', data}));
        socket.on('taskMember', data => socket.broadcast.emit('taskMember', {type: 'taskMember', data}));
        socket.on('taskDueDate', data => socket.broadcast.emit('taskDueDate', {type: 'taskDueDate', data}));
        socket.on('taskName', data => socket.broadcast.emit('taskName', {type: 'taskName', data}));
        socket.on('taskDesc', data => socket.broadcast.emit('taskDesc', {type: 'taskDesc', data}));
        socket.on('uploadImg', data => socket.broadcast.emit('uploadImg', {type: 'uploadImg', data}));
        socket.on('attachment', data => socket.broadcast.emit('attachment', {type: 'attachment', data}));
        socket.on('previewImg', data => socket.broadcast.emit('previewImg', {type: 'previewImg', data}));
        socket.on('comment', data => socket.broadcast.emit('comment', {type: 'comment', data}));
        socket.on('label', data => socket.broadcast.emit('label', {type: 'label', data}));
        socket.on('taskColor', data => socket.broadcast.emit('taskColor', {type: 'taskColor', data}));
        // socket.on('activity', data => socket.broadcast.emit('activity', {type: 'activity', data}));

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