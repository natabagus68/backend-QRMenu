import User from "../models/User"
import sequelize from "../models/sequelize"
import bcrypt from 'bcryptjs'
import { validationResult } from "express-validator";
class UserController {
    async createUser(req, res) {
        const { name, email, password } = req.body;
        const avatarPath = req.file ? '/image/user/' + req.file.filename : null;

        const transaction = await sequelize.transaction();

        try {
            const [user, userHasCreated] = await User.findOrCreate({
                where: { email },
                defaults: {
                    email,
                    password: await bcrypt.hash(password, 10), // Hash kata sandi asinkron
                    name,
                    avatarPath
                },
                transaction
            });

            await transaction.commit();

            if (userHasCreated && user) {
                return res.json({
                    message: 'User created',
                    statusCode: 200
                });
            } else {
                return res.status(500).json({ message: 'Failed to create data user' });
            }
        } catch (error) {
            await transaction.rollback();
            console.error(error); // Catat kesalahan untuk debugging
            return res.status(500).json({ message: 'Failed to create data user' });
        }
    }

    async updateUser(req, res) {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, name } = req.body;
        let avatarPath = null;

        // Periksa apakah ada file gambar yang diunggah
        if (req.file) {
            avatarPath = '/image/user/' + req.file.filename;
        }

        const user = await User.findByPk(req.params.id);

        if (!user) {
            return res.status(404).json({ error: 'Pengguna tidak ditemukan' });
        }

        try {
            const update = await User.update(
                {
                    name,
                    email,
                    avatarPath: avatarPath ? avatarPath : user.avatarPath
                },
                {
                    where: {
                        id: req.params.id
                    }
                }
            );

            res.json({ message: 'Pembaruan berhasil' });
        } catch (error) {
            res.status(500).json({ error: 'Terjadi kesalahan saat memperbarui pengguna' });
        }
    }
}

export default new UserController