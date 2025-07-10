const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, "./backend/files")
    },
    filename: function(req, file, cb){
        cb(null, Date.now() + file.originalname)
    }
})

const upload = multer({
    storage,
    fileFilter: function(req, file, cb){
        let extension = path.extname(file.originalname)
        if(['.pdf','.txt','.docx'].includes(extension)){
            cb(null, true)
        } else {
            cb(null, false)
        }
    }
})
module.exports = upload