import { Router } from "express";
import { getEmpresa } from "../controllers/regisrtro.js";

export const registro = Router()

registro.post("/getEmpresa", getEmpresa)
