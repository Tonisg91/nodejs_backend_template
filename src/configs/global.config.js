require('dotenv').config()
const pkg = require('../../package.json')

module.exports = {
    MONGO_DATABASE: process.env.MONGO_DATABASE || pkg.name,
    MONGO_USER: process.env.MONGO_USER || 'admin',
    MONGO_PASSWORD: process.env.MONGO_PASSWORD || 'admin',
    MONGO_HOST: process.env.MONGO_HOST || 'localhost',
    PORT: Number(process.env.PORT) || 5000,
    URL: process.env.URL || `http://localhost:5000`,
    JWT_KEY: process.env.JWT_KEY,
    CORS_ORIGIN: process.env.CORS_ORIGIN || 'http://localhost:3000',
    CLOUDINARY: {
        cloud_name: process.env.CLOUDINARY_NAME,
        api_key: process.env.CLOUDINARY_KEY,
        api_secret: process.env.CLOUDINARY_SECRET
    }
}
