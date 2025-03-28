import jwt from "jsonwebtoken";
import {modelos} from '../model/model.js'

const login = async(req,res ) =>{
    try{
        const {email,password} = req.query
        await modelos.consultaLogin(email,password)
        const token = jwt.sign({email}, "az_AZ",{expiresIn: "1h"})
        res.send(token)

    }catch(error){
        console.log(error);
        res.status(error.code || 500).send(error)
    }}

    const register = async(req,res) =>{
        try{
            console.log(req.body)
            const usuario = req.body;
            await modelos.registrarUsuario(usuario)
            res.send("Usuario registrado")
        }catch(error){
            res.status(500).send(error)
        }
    }
export const controllers = {login,register}