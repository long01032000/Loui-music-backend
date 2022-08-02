
const userSchema = require('../model/user.model')
const chatSchema = require('../model/chat.model')
const Message = require('../model/message.model')

async function createChatRoom(req,res){
    try {
        const user = await userSchema.findOne({
            email : req.user.email,
        }).exec();
        if(!user){
            return res.status(400).json({message:'user is invalid'})
        }
        const newChatRoom = {
            roomName: req?.body.roomName,
            email : user?.email,
            messageChat: []
        }
        const newRoomChat = await chatSchema(newChatRoom).save()
        return res?.status(200).json(newRoomChat)

    } catch (error) {
        console.log(error);
        return res?.status(200).json({message: error})
        
    }
}
async function DeleteChatRoom(req,res){
    try {
        const chatRoom = await chatSchema.findOne({
            _id: req.params._id
        })
        console.log(chatRoom.email,req.user.email)
        if(chatRoom.email != req.user.email){
            return res.status(201).json({
                message: "Private permission"
            })
        }
        const res1 = await chatSchema.deleteOne({
            _id: req.params._id
        })
        return res.status(200).json(res1)
    } catch (error) {
        
    }
}
async function sendMessage(req,res){
    try {
        const user = await userSchema.findOne({
            email : req.user.email,
        }).exec();
        if(!user){
            return res.status(400).json({message:'user is invalid'})
        }
        let roomChat = await chatSchema.findOne({
            _id: req?.params._id
        }).exec();
        if(!roomChat){
            return res.status(400).json({message:'room chat is invalid'})
        }
        const newMessage = {
            message: req.body.message,
            roomName: roomChat.roomName,
            email: user.email,
            avatar: user?.avatar
        }
        roomChat.messageChat = [...roomChat.messageChat,newMessage]
        await chatSchema(roomChat).save()
        return res?.status(200).json(newMessage)

    } catch (error) {
        
    }

}
async function getAllChatRoom(req,res){
    try {
        const data = await chatSchema.find().exec();
        return res.status(200).json(data)
    } catch (error) {
        c
        return res.status(200).json({message: 'Can not get the message Room'})
    }
}
async function getRoom (req,res){
    try {
        const res1 = await chatSchema.findOne({
            _id: req.params._id
        })
        return res.status(200).json(res1)
    } catch (error) {
        
    }
}
module.exports = {
    createChatRoom,
    sendMessage,
    getAllChatRoom,
    getRoom,
    DeleteChatRoom
}