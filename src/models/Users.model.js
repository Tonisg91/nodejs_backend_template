const { Schema, model } = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new Schema(
    {
        name: String,
        email: {
            type: String,
            required: [true, 'Email obligatorio'],
            match: [/^\S+@\S+\.\S+$/, 'Dirección de correo inválida'],
            unique: true,
            lowercase: true,
            trim: true
        },
        passwordHash: {
            type: String,
            required: [true, 'Contraseña obligatoria']
        },
        avatar: {
            type: String,
            default:
                'https://adncultura.org/sites/default/files/styles/mg_user_picture/public/default_images/default-user.png?itok=-m-meRA9'
        },
        role: {
            type: Schema.Types.ObjectId,
            ref: 'Role'
        }
    },
    {
        timestamps: {
            createdAt: 'createdAt',
            updatedAt: 'updatedAt'
        },
        versionKey: false
    }
)

userSchema.statics.encryptPassword = async (password) => {
    const salt = bcrypt.genSaltSync(10)
    return await bcrypt.hashSync(password, salt)
}

userSchema.statics.comparePassword = async (password, receivedPassword) => {
    return await bcrypt.compareSync(password, receivedPassword)
}

module.exports = model('User', userSchema)
