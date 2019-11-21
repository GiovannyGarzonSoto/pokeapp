import express, {Application} from 'express'
import morgan from 'morgan'
import path from 'path'
import multer from 'multer'
import env from 'dotenv'
import cors from 'cors'

//initializations
const app: Application = express()
env.config()

//config
app.set('port', process.env.PORT || 3666)

//middlewares
app.use(cors())
app.use(morgan('dev'))
app.use(express.urlencoded({extended: false}))
app.use(express.json())

//multer configuration
const storage = multer.diskStorage({
    destination: path.join(__dirname, '../dist/uploads'),
    filename(req, file, callback) {
        callback(null, new Date().getTime()+path.extname(file.originalname));
    }
});
app.use(multer({storage}).single('image'));

//routes
app.use(require('./routes/'));

//static files
app.use(express.static(path.join(__dirname, '../dist')))

export default app