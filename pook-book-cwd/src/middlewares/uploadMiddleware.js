import multer from 'multer'
import sharp from 'sharp'

const storageDestination = './public/assets/productImages'
const storage = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null,storageDestination)
    },
    filename: function(req,file,cb) {
        return cb(null,file.fieldname + '-' + Date.now() + '.png')
    }

})

const fileFilter = (req,file,cb) => {
    if (
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/jpeg" ||
        file.mimetype === "image/png"
      ) {
        cb(null, true);
      } else {
        cb(new Error("Image uploaded is not of type jpg/jpeg  or png"), false);
      }
}

const upload = multer({storage,fileFilter})


const resize = (req,res,next) => {
    if(!req.file) return next();
    sharp(req.file.path)
    .resize(256,144)
    .toFile(`${storageDestination}/256x144-${req.file.filename}`,
        (err) => {
            if(err){
                console.error("Sharp>>>", err);

            }
            console.log("Resize Successfully")
        }
    )
    next();
}


export {
    upload,
    resize
}