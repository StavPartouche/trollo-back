const express = require('express')
const {requireAuth} = require('../../middlewares/requireAuth.middleware')
const {getUser, getUsers, updateUser} = require('./user.controller')
const router = express.Router()

router.get('/', getUsers)
router.get('/:id', getUser)
router.put('/:id',  requireAuth, updateUser)

module.exports = router