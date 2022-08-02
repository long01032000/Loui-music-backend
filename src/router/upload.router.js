const { Router } = require("express")
const cloudinary = require("cloudinary")
const fs = require("fs")
const uploadRouter = Router()


cloudinary.config({
    cloud_name: "nadasdasaadaad",
    api_key: "943617666776966",
    api_secret: "4DN4BYLwlKA3wIlup9V5ks-wSQY",
  });
uploadRouter.post("/upload/mp3", (req, res) => {
    const removeTmp = (path) => {
      fs.unlink(path, (err) => {
        if (err) throw err
      })
    }
    try {
        console.log(req.file)
      if (!req.files || Object.keys(req.files).length === 0)
        return res.status(400).json({ msg: "No files were uploaded." })
  
      const file = req.files.file
      if (file.size > 1024 * 1024 * 100) {
        removeTmp(file.tempFilePath)
        return res.status(400).json({ msg: "Size too large" })
      }
      cloudinary.v2.uploader.upload(
        file.tempFilePath,
        { resource_type: "raw"},
        function (error, result) {
          res.json({ public_id: result.public_id, url: result.secure_url })
        }
      )
    } catch (err) {
      console.log(err)
      return res.status(500).json({ msg: err.message })
    }
  })


  uploadRouter.post("/upload/image", (req, res) => {
    const removeTmp = (path) => {
      fs.unlink(path, (err) => {
        if (err) throw err
      })
    }
    try {
        console.log(req.file)
      if (!req.files || Object.keys(req.files).length === 0)
        return res.status(400).json({ msg: "No files were uploaded." })
  
      const file = req.files.file
      if (file.size > 1024 * 1024 * 100) {
        removeTmp(file.tempFilePath)
        return res.status(400).json({ msg: "Size too large" })
      }
      cloudinary.v2.uploader.upload(
        file.tempFilePath,
        { resource_type: "raw"},
        function (error, result) {
          res.json({ public_id: result.public_id, url: result.secure_url })
        }
      )
    } catch (err) {
      console.log(err)
      return res.status(500).json({ msg: err.message })
    }
  })

module.exports = uploadRouter
