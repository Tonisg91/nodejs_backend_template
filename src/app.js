const express = require('express')
const logger = require('morgan')
const cors = require('cors')

const config = require('./configs/global.config')
const R = require('./routes')

const app = express()

app.set('port', config.PORT)

app.use(
    cors({
        credentials: true,
        origin: config.CORS_ORIGIN
    })
)
app.use(logger('dev'))

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api', R.auth, R.upload)
app.use('/api/users', R.users)

module.exports = app
