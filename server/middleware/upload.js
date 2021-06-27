const multer = require('multer');
const path = require('path');
//import '../uploads'


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "../client-frontend/src/uploads");
    },
    filename: function (req, file, cb) {
        //console.log(file)
        cb(null, 'congar' + '-' + Date.now() + path.extname(file.originalname));
        //cb(null, 'congar' + '-' + Date.now() );
    }
});

const fileFilter = (req, file, cb) => {
    cb(null, true);
};

let upload = multer({
    storage: storage,

    fileFilter: fileFilter,
});

module.exports = upload.single('categoryImage')