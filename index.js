import express from 'express'
const app = express()
import cors from 'cors'
import route from './routes/routes.js'

app.use(cors());
app.use(express.json())
app.use("/softjobs",route)


const PORT = process.env.PORT || 3000;
app.listen(PORT ,()=>console.log("server escuchando en el puerto http://localhost:"+PORT));