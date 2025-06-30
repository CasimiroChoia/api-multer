import multer from "multer";
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // let extension = path.extname(file.originalname).toLocaleLowerCase().replace(".", "");
        if (file.mimetype.includes("image")) { //imagem
            cb(null, "public/uploadedFiles/image/");
        }
        else if (file.mimetype.includes("video")) { //video
            cb(null, "public/uploadedFiles/video/");
        }
        else if ((file.mimetype.includes("audio"))) { // audio
            cb(null, "public/uploadedFiles/audio/");
        }
        else if (file.mimetype.includes("pdf")) { //pdf
            cb(null, "public/uploadedFiles/documents/pdf");
        }
        else {
            cb(null, "public/uploadedFiles/other/");
        }
    },
    filename: (req, file, cb) => {
        // const unicSufix = Date.now();
        // cb(null, file.originalname + "___" + path.extname(file.originalname))
        cb(null, file.originalname.replaceAll(" ", "_"));
    }
});
export const uploadConfig = multer({ storage });
