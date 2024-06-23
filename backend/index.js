const express=require('express');
const cors=require('cors');
const cookieParser=require('cookie-parser')
require('dotenv').config();
const connectDB=require('./config/db')
const router=require('./routes');
const bodyParser=require('body-parser')


const app=express();
app.use(bodyParser.json())
app.use(cookieParser())
app.use(cors({
    origin:process.env.FRONTEND_URL,
    credentials:true
}));
app.use(express.json())
app.use("/api",router)

const PORT=8080|| process.env.PORT
connectDB().then(()=>{
    app.listen(PORT,()=>{
        console.log(`Server is running on port ${PORT}`)
    });
})
