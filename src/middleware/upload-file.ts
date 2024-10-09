import multer from "multer";
import { CustomError } from "../errors/custom-error";

const storage = multer.memoryStorage();
export const upload = multer({ 
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024
    },
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
})

export default upload;