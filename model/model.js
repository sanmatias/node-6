import {pool} from '../db/db.js'
import bcrypt from 'bcryptjs';

const consultaLogin = async (email,password) =>{
    const consulta = "SELECT * FROM usuarios WHERE email = $1 AND password = $2";
    const values = [email,password];
    const {rowCount} =await pool.query(consulta,values);
    if(!rowCount)throw{code:404,message:"No se encontraron creedenciales"}
}

const registrarUsuario = async (email,password)=>{
    const values = [email];
    const consulta = 'SELECT * FROM usuarios WHERE email = $1';
    const {rows: [usuario],rowCount} = await pool.query(consulta,values);
    const {password: passwordEncriptada} = usuario;
    const passwordCorrecta = bcrypt.compareSync(password,passwordEncriptada)
    if(!passwordCorrecta || !rowCount)throw{code:401,message:"Email o contraseña incorrecta"}
}

export const modelos = {registrarUsuario,consultaLogin}