import multer from "multer";

export class FileSystem {

    static validate(req, res, next) {
        const allowedFileTypes = ['image/jpeg', 'image/png']; // Ubah sesuai kebutuhan Anda

        if (!allowedFileTypes.includes(req.file.mimetype)) {
            return res.status(400).json({ error: 'Tipe file tidak valid' });
        }
        next();
    }

    static upload(dest) {
        const storage = multer.diskStorage({
            destination: function (req, file, cb) {
                cb(null, '../../tempStorage/' + dest)
            },
            filename: function (req, file, cb) {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
                cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.originalname.split('.').pop());
            }
        })

        const upload = multer({ storage })
        return upload
    }
}


