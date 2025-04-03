import { controllers } from "../control/controller.js";
import {Router} from 'express';
import { autorizacion } from "../middleware/auth.js";
const route = Router();

route.post("/login", controllers.login)

route.post("/usuarios",controllers.register)

route.get("/usuarios",autorizacion.verificarToken,controllers.findById)

route.get("*",(req,res)=>{res.status(404).send("La pagina no existe")});


export default route;