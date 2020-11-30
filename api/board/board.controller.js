const logger = require('../../services/logger.service')
const boardService = require('./board.service')

async function getBoards(req, res) {
    try {
        const boards = await boardService.query(req.query)
        res.send(boards)
    } catch (err) {
        logger.error('Cannot get boards', err);
        res.status(500).send({ error: 'cannot get boards' })

    }
}

async function getBoard(req, res) {
    try {
        const board = await boardService.getById(req.params.id)
        res.send(board)
    } catch (err) {
        logger.error('Cannot get board', err);
        res.status(500).send({ error: 'cannot get board' })

    }
}

async function deleteBoard(req, res) {
    try {
        await boardService.remove(req.params.id)
        res.end()
    } catch (err) {
        logger.error('Cannot delete board', err);
        res.status(500).send({ error: 'cannot delete board' })
    }
}

async function saveBoard(req, res) {
    try {
        var board = req.body;
        const user = req.session.user;
        board = await boardService.save(board)
        res.send(board)
    } catch (err) {
        logger.error('Cannot add board', err);
        res.status(500).send({ error: 'cannot add board' })
    }
}

module.exports = {
    getBoards,
    deleteBoard,
    saveBoard,
    getBoard
}