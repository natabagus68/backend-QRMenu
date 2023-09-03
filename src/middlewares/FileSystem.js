import multer from "multer";
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fs from 'fs'

export class FileSystem {

    static validate(req, res, next) {
        const allowedFileTypes = ['image/jpeg', 'image/png']; // Ubah sesuai kebutuhan Anda

        if (!allowedFileTypes.includes(req.file.mimetype ?? '')) {
            return res.status(400).json({ error: 'Tipe file tidak valid' });
        }
        next();
    }

    static upload(dest, filename) {
        const storage = multer.diskStorage({
            destination: function (req, file, cb) {
                cb(null, 'tempStorage/' + dest)
            },
            filename: function (req, file, cb) {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
                cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.originalname.split('.').pop());
            }
        })

        const upload = multer({ storage })
        return (req, res, next) => {
            upload.single(filename)(req, res, function (err) {
                console.log(req.file)
                if (err) {
                    return res.status(400).json({ error: 'Gagal mengunggah file' });
                }
                return next();
            });
        };
    }


    static destroy(oldFile, destination) {
        fs.unlink('tempStorage/' + destination + "/" + oldFile, (err) => {
            if (err) {
                console.error('Gagal menghapus file lama:', err);
            }
        })
    }
}


