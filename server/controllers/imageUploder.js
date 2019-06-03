const multer = require('multer');
const crypto = require('crypto');
const path = require('path')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/uploads/')
    },
    filename: (req, file, cb) => {
        crypto.pseudoRandomBytes(16, (err, raw) => {
            if(err) return cb(err)

            cb(null, raw.toString('hex') + path.extname(file.originalname));
        
        });
    }
});
const upload = multer({ storage: storage });
module.exports = upload; 
