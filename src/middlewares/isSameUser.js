const Users = require('../models/Users.model')

module.exports = async (req, res, next) => {
    try {
        const { _id } = await Users.findById(req.userId, { passwordHash: 0 })

        if (_id !== req.userId) return res.status(401).send('Unauthorized')

        return next()
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized' })
    }
}
