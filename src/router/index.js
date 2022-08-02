const { Router}  = require('express')
const authenticationRouter =require('../router/authuticate.router')
const userRouter = require('./user.router')
const database = require('../db');
const chatRoomRouter = require('./chat.router');
const musicRouter = require('./music.router');
const uploadRouter = require('./upload.router');
const albumRouter = require('./alnum.router');
const artisRouter = require('./artist.router');
const playListRouter = require('./playList.router');
const router = Router();
database.connect();
router.use([
    authenticationRouter,
    userRouter,
    chatRoomRouter,
    musicRouter,
    uploadRouter,
    albumRouter,
    artisRouter,
    playListRouter
])

module.exports = router;