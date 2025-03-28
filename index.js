import express from 'express'
const app = express()
import cors from 'cors'


app.use(cors());
app.use(express.json())



const PORT = process.env.PORT || 3000;
app.listen(PORT ,()=>console.log("server escuchando en el puerto http://localhost:"+PORT));