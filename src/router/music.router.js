const { Router } = require('express')
const { CreateMusic, GetAllMusic,getMusic, searchMuic, DeleteMucic, likeMusic, getLikeMusic } = require('../controller/music.controller')
const { authenticate } = require('../middleware/authuticate.middlerware')
const musicRouter = Router()

musicRouter.post('/create-music',CreateMusic)
musicRouter.get('/get-all-music',GetAllMusic)
musicRouter.delete('/delete-music/_id',DeleteMucic)
musicRouter.post('/search',searchMuic)
musicRouter.get('/music/:_id',getMusic)
musicRouter.get('/like-music/:_id',authenticate,likeMusic)
musicRouter.get('/list-like-music',authenticate,getLikeMusic)




module.exports = musicRouter