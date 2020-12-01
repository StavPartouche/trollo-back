const express = require('express')
const {requireAuth} = require('../../middlewares/requireAuth.middleware')
const {saveBoard, getBoards, deleteBoard, getBoard} = require('./board.controller')
const router = express.Router()

router.get('/', getBoards)
router.get('/:id', getBoard)
router.post('/', saveBoard)
router.put('/:id', saveBoard)
router.delete('/:id', deleteBoard) 

module.exports = router