import Company from "../models/Company"
import sequelize from "../models/sequelize"

class CompanyController {
    constructor() { }
    async create(req, res) {
        const { name, address, collor_theme, } = req.body
        const { id } = req.auth
        try {
            const t = await sequelize.transaction()
            const create = Company.create({
                user_id: id,
                name,
                address,
                collor_theme,
                image_company: req.file ? 'image/company/' + req.file.filename : null,
            }, {
                transaction: t
            })
            t.commit()
            res.json({
                message: 'success',
                data: create
            })
        } catch (error) {
            await t.rollback()
            res.status(500).json({
                message: 'Internal server error'
            })
        }

    }

}

export default new CompanyController