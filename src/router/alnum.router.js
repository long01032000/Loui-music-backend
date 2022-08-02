const { Router } = require('express')
const { CreateAlbum, getAllAlbum, likeAlbum, getAllLikeAlbum } = require('../controller/album.controller')
const { getAllLikeArtist } = require('../controller/artist.controller')
const { authenticate } = require('../middleware/authuticate.middlerware')
const albumRouter = Router()
albumRouter.post('/create-album' ,CreateAlbum)
albumRouter.get('/albums' ,getAllAlbum)
albumRouter.get('/like-album/:_id',authenticate,likeAlbum)
albumRouter.get('/get-like-album',authenticate,getAllLikeAlbum)


module.exports = albumRouter