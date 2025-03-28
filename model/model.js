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
    let {email,password} = usuario;
    const passwordEncriptado = bcrypt.hashSync(password);
    password = passwordEncriptado
    const values =[email,password];
    console.log(values)
    const consulta = "INSERT INTO usuarios values (DEFAULT, $1,$2)"
    //console.log(consulta)
    await pool.query(consulta,values)
}

export const modelos = {registrarUsuario,consultaLogin}