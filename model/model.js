import {pool} from '../db/db.js'
import bcrypt from 'bcryptjs';

const consultaLogin = async (email,password) =>{
    const values = [email];
    const consulta = 'SELECT * FROM usuarios WHERE email = $1';
    const {rows: [usuario],rowCount} = await pool.query(consulta,values);
    const {password: passwordEncriptada} = usuario;
    const passwordCorrecta = bcrypt.compareSync(password,passwordEncriptada)
    if(!passwordCorrecta || !rowCount)throw{code:401,message:"Email o contraseña incorrecta"}
}

const registrarUsuario = async (usuario)=>{
    
    try{
        let {email,password,rol,lenguage} = usuario;
    const passwordEncriptado = bcrypt.hashSync(password);
    password = passwordEncriptado
    const values =[email,password,rol,lenguage];
    const consulta = "INSERT INTO usuarios (email,password,rol,lenguage) VALUES ($1,$2,$3,$4)"
        await pool.query(consulta,values)
    }catch(error){
        console.log(error)
    }   
}

export const modelos = {registrarUsuario,consultaLogin}