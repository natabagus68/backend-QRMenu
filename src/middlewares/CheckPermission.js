import jwt from 'jsonwebtoken';
import configs from '../configs/index';
class CheckPermission {
    constructor() {

    }

    checkPermission(permission) {
        return async (req, res, next) => {
            try {

                const auth = req.auth.user.positions[0].permissions.map(item => item.name)
                var check = false

                permission.forEach(element => {
                    if (auth.includes(element)) {
                        check = true
                    }
                });

                console.log({ check })


                if (!check) {
                    return res.status(401).json({
                        statusCode: 401,
                        message: 'Unauthorized!',
                    })
                }

                return next();

            } catch (e) {
                console.error('Unauthorized =>', e);
                return res.status(401).json({
                    message: 'Unauthorized'
                });
            }
        }
    }
}

export default new CheckPermission;