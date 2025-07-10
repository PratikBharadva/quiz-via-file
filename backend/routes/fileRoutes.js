const express = require("express")
const fs = require("fs")
const path = require("path")
const pdfParse = require("pdf-parse")
const mammoth = require("mammoth")
const upload = require("../config/multerConfig")
const {generateQuiz} = require("../utils/geminiClient")

const router = express.Router()

// works well only for .txt file
// router.post('/upload', upload.single('inputfile'), (req, res) => {
//     try {
//         if(!req.file){
//            return res.status(404).json({
//             success: false,
//             message: "File is not received!"
//            }) 
//         }

//         let readableStream = fs.createReadStream(path.resolve(req.file?.path), {
//             encoding: 'utf-8',
//             highWaterMark: 32 * 1024
//         });
//         let text = '';

//         readableStream.on('data', (chunk) => {
//             text += chunk;
//         })

//         readableStream.on('close', () => {
//             console.log("File content: ", text)
//             // console.log(req.file)

//             fs.unlinkSync(path.resolve(req.file?.path))

//             return res.json({
//                 success: true,
//                 message: "File content read successfully!"
//             })
//         })

//         readableStream.on('error', (err) => {
//             console.error('Error reading stream: ', err)
//             fs.unlinkSync(path.resolve(req.file?.path))
//             return res.status(500).json('Error processing file');
//         })

//         // res.status(200).json({
//         //     success: true,
//         // })
//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: error.message
//         })
//     }
// })

router.post('/upload', upload.single('inputfile'), async (req, res) => {
    try {
        if(!req.file){
           return res.status(404).json({
            success: false,
            message: "File is not received!"
           }) 
        }

        const filePath = path.resolve(req.file.path);
        const fileBuffer = fs.readFileSync(filePath);

        let text = '';

        if (req.file.mimetype === 'application/pdf') {
            const pdfData = await pdfParse(fileBuffer);
            text = pdfData.text;
        } else if (req.file.mimetype === 'text/plain') {
            text = fileBuffer.toString('utf-8');
        } else {
            text = await mammoth.extractRawText({ buffer: fileBuffer })
        }

        fs.unlinkSync(filePath); // Clean up

        // console.log("File content:", text);
        const quizObject = await generateQuiz(text)
        res.json({
            success: true,
            message: "File content read successfully!",
            quiz: quizObject
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
})

module.exports = router