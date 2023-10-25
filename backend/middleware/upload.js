const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});
const upload = multer({ 
      storage: storage ,
      fileFilter: function (req, file, cb) {
        if(file.mimetype === "image/jpeg" || file.mimetype === "image/png" || file.mimetype === "application/pdf")
            cb(null, true);
        else
            cb(null, false); 
      }
});


module.exports = upload