const cloudinary = require('cloudinary').v2
const { CloudinaryStorage } = require('multer-storage-cloudinary')
const multer = require('multer')
const { CLOUDINARY } = require('../configs/global.config')
const PKG = require('../../package.json')

cloudinary.config(CLOUDINARY)

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: PKG.name, // Carpeta en Cloudinary
        format: async (req, file) => 'png',
        public_id: (req, file) => file.originalname
    }
})

module.exports = multer({ storage })
