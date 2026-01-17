const multer = require('multer');

const storage = multer.memoryStorage();

const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
    fileFilter: (req, file, cb) => { 
        const allowTypes = ['image/jpeg', 'image/png', 'image/webp'];
        if (!allowTypes.includes(file.mimetype)) {
            return cb(new Error('Invalid file type'));
        }
        else
        {
            cb(null, true);
        }
    }
});

module.exports = upload;