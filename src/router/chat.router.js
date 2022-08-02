const { Router } = require('express')
const { createChatRoom, sendMessage, getAllChatRoom, getRoom, DeleteChatRoom } = require('../controller/chat.controller')
const { authenticate} = require('../middleware/authuticate.middlerware')
const chatRoomRouter = Router()

chatRoomRouter.post('/roomchat',authenticate,createChatRoom)
chatRoomRouter.get('/delete-chat/:_id',authenticate,DeleteChatRoom)

chatRoomRouter.post('/message/:_id',authenticate,sendMessage)
chatRoomRouter.get('/roomschat',getAllChatRoom)
chatRoomRouter.get('/get-room/:_id',getRoom)



module.exports = chatRoomRouter