import multer from "multer";
import path from "path";

type fileProps = {
    originalname: string,
    fieldname: string,
    mimetype: string,
    encoding: string
}

const storage = multer.diskStorage({
    destination: (req: any, file: fileProps, cb: any) => {

        switch (path.extname(file.originalname).toLocaleLowerCase()) {
            case ".jpg" || ".png" || ".jpeg": //imagem
                cb(null, "public/uploadedFiles/image/")
                break;
            case ".mp4" || ".avi" || ".mov": //video
                cb(null, "public/uploadedFiles/video/")
                break;
            case ".mp3" || ".wav" || ".aac": // audio
                cb(null, "public/uploadedFiles/audio/")
                break;
            default:
                cb(null, "public/uploadedFiles/other/")
                break;
        }
    },
    filename: (req: any, file: fileProps, cb: any) => {
        const unicSufix = Date.now();
        // cb(null, file.originalname + "___" + path.extname(file.originalname))
        cb(null, file.originalname)
    }
})

export const uploadConfig = multer({ storage })