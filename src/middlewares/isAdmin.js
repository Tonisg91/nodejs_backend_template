const dbModels = require('../models')

module.exports = async (req, res, next) => {
    try {
        const { Users, Roles } = dbModels

        const user = await Users.findById(req.userId)
        const role = await Roles.findById(user.role)

        if (!user.verificated) return res.status(401).send('Unauthorized.')

        if (role.name === 'admin') return next()

        return res.status(401).send('Unauthorized')
    } catch (error) {
        return res.status(401).send('Unauthorized.')
    }
}
