const multer = require("multer");
const sharp = require("sharp");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/api/static/images/userPictures");
  },
  filename: function (req, file, cb) {
    const flag = file.originalname;
    const id = req.params.id
    switch(file.originalname){
      case flag.includes('jpg'):
        return cb(null, file.fieldname + '-' + id + ".jpg")
      case flag.includes('jpeg'):
        return cb(null, file.fieldname + '-' + id + ".jpeg")
      case flag.includes('png'):
        return cb(null, file.fieldname + '-' + id + ".png")
      default :
        return cb(null, file.fieldname + '-' + id + ".jpg")
    }
  },
});
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png"
  ) {
    cb(null, true);
  } else {
    cb(new Error("Image uploaded is not of type jpg/jpeg  or png"), false);
  }
};

const resize = (req, res, next) => {
  if (!req.file) return next();
  sharp(req.file.path)
    .resize(256, 144)
    .toFile(
      "./public/api/static/images/userPictures/" +
      "256x144-" +
      req.file.filename,
      (err) => {
        if (err) {
          console.error("sharp>>>", err);
        }
        console.log("resize successfully");
      }
    );
  next();
};
const upload = multer({ storage, fileFilter });

module.exports = { upload, resize };
