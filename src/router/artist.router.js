const { Router } = require('express')
const { CreateArtist, getAllArtist ,likeArtis,getAllLikeArtist} = require('../controller/artist.controller')
const { authenticate } = require('../middleware/authuticate.middlerware')
const artisRouter = Router()
artisRouter.post('/create-artist' ,CreateArtist)
artisRouter.get('/artists' ,getAllArtist)
artisRouter.get('/like-artist/:_id',authenticate,likeArtis)
artisRouter.get('/get-like-artist',authenticate,getAllLikeArtist)

module.exports = artisRouter