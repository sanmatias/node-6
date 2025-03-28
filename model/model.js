import pool from '../db/db.js'
import bcrypt from 'bcryptjs';

const login = async (email,password) =>{
    const consulta = "SELECT * FROM usuarios WHERE email = $1 AND password = $2";
    const values = [email,password];
    const {rowCount} =await pool.query(consulta,values);
    if(!rowCount)throw{code:404,message:"No se encontraron creedenciales"}
}

const registrarUsuario = async (usuario)=>{
    let {email,password} = usuario;
    const passwordEncriptado = bcrypt.hashSync(password);
    password = passwordEncriptado
    const values =[email,password];
    const consulta = "INSERT INTO usuarios values (DEFAULT, $1,$2)"
    await pool.query(consulta,values)
}

export const modelos = {registrarUsuario,login}