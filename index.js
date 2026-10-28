import express from 'express'
import connectDB from  './config/db.js'
import authRoutes from './routes/auth.routes.js'
import fileRoutes from './routes/file.routes.js'
import mailRoutes from './routes/mail.routes.js'
const app = express()

const PORT = 5000
app.use(express.json())
app.use('/api/auth',authRoutes)
app.use('/api/files',fileRoutes)
app.use('/api/mails',mailRoutes)


app.get('/',(req,res)=>{
    res.send("Coldmailer API is runnning");
})

app.use((error, req, res, next) => {
    if (error instanceof multer.MulterError) {
        const message = error.code === "MISSING_FIELD_NAME"
            ? "Malformed multipart upload: every part must have a non-empty field name."
            : error.message

        return res.status(400).json({
            success: false,
            code: error.code,
            msg: message
        })
    }

    next(error)
})

connectDB()

app.listen(PORT,()=>{
    console.log(`Server is running on Port : ${PORT}`);
})
