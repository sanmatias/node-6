import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const rutaReporte = '../reportes.json';

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const logger = async (req,res,next)=>{
    const rutaValida = path.join(__dirname,rutaReporte);

    const informacionReporte ={
        fecha: new Date().toString(),
        metodo: req.method,
        ruta: req.originalUrl,
    }
    try{
    let registros = [];
    try{
        const data = await fs.readFileSync(rutaValida, 'ascii');
        registros = JSON.parse(data);
    }catch(error){
        if(error.code !== 'ENOENT'){
            console.error("Error al leer el archivo ", error)
             return next();  
        }
    }
        
        registros.push(informacionReporte);
        await fs.writeFileSync(rutaValida, JSON.stringify(registros,null,2));
        console.log("Registro grabado con exito",informacionReporte);
    }catch(error){
        console.error("Error al grabar json ",error)


    }
    next();
        
        
};

export const reportes = {logger}