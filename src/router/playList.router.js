const { Router } = require('express')
const { authenticate } = require('../middleware/authuticate.middlerware')
const { createPlayList, addToPlayList, getPlayPlist, getPlayList, DeletePlaylist } = require('../controller/playList.controller')

const playListRouter = Router()
playListRouter.post('/create-play-list' ,authenticate,createPlayList)
playListRouter.get('/addPlayList/:_idPlay/:_id',authenticate,addToPlayList)
playListRouter.get('/list-play',authenticate,getPlayPlist)
playListRouter.get('/play-list/:_id',getPlayList)
playListRouter.delete('/delete-play-list/:id',DeletePlaylist)



module.exports = playListRouter