const router = require('express').Router()
const upload = require('../services/upload_service')
const { uploadC } = require('../controllers')
const { isAuthenticated } = require('../middlewares')

// Subir un nuevo archivo AWS
router.post(
    '/upload',
    isAuthenticated,
    upload.array('file', 50),
    uploadC.uploadFiles
)

module.exports = router
