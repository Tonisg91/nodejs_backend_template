const jwt = require('jsonwebtoken')
const config = require('../configs/global.config')

const { Users, Roles } = require('../models')

const signToken = (_id) => {
    return jwt.sign(
        { _id }, // userId
        String(config.JWT_KEY), // Secret JWT key
        { expiresIn: 60 * 60 * 24 * 365 } // Expires in one year
    )
}

const postSignup = async (req, res) => {
    try {
        const { email, password, role } = req.body
        if (!email || !password)
            return res.status(400).send('Email and password are mandatory.')

        const userFound = await Users.findOne({ email })
        if (userFound) return res.status(200).send('User already exists.')

        const foundRole = await Roles.findOne({ name: role || 'user' })
        const defaultName = `${email.slice(
            0,
            4
        )}${await Users.countDocuments()}`

        await Users.create({
            email,
            passwordHash: await Users.encryptPassword(password),
            role: foundRole._id,
            name: defaultName
        })

        res.status(200).send('User created succesfully.')
    } catch (error) {
        res.status(500).send('Signup error.')
    }
}

const postLogin = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password)
            return res.status(400).send('Email and password are mandatory.')

        const userFound = await Users.findOne({ email }).populate('role')

        if (!userFound)
            return res
                .status(404)
                .send("User doesn't exists. Please, create an account.")
        if (!userFound.verificated)
            return res
                .status(401)
                .send(
                    'You need to activate your account. Please, check your email inbox.'
                )

        const pwdMatch = await Users.comparePassword(
            password,
            userFound.passwordHash
        )

        if (!pwdMatch) return res.status(401).send("Password doesn't match.")

        const token = signToken(userFound._id)
        res.status(200).json({ token })
    } catch (error) {
        res.status(500).send('Login error.')
    }
}

module.exports = {
    postSignup,
    postLogin
}
