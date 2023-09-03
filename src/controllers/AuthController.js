import User from "../models/User"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import configs from "../configs"
class AuthController {
    constructor() { }

    async login(req, res) {
        const { email, password } = req.body

        const user = await User.findOne({ where: { email } })

        if (!user) {
            return res.status(401).json({
                message: 'email not found'
            })
        }

        const comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword) {
            return res.status(400).json({
                message: 'password not compare'
            })
        }

        const buildToken = jwt.sign({
            id: user.id,
            email: user.email
        }, configs.auth.key)

        res.json({
            message: 'success',
            token: buildToken,
            data: user
        })
    }


    async me(req, res) {
        try {
            res.json({
                message: 'success',
                token: req.token,
                user: req.auth
            })
        } catch (error) {
            res.status(500).json({
                message: 'Internal server error'
            })
        }

    }
}

export default new AuthController