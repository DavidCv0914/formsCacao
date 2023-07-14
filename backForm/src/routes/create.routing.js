import { Router } from "express";
import { createDepartamento, createPais, getPaises } from "../controllers/create.js";

export const create = Router()

create.post("/createPais", createPais)
create.get("/getPaises", getPaises)
create.post("/createDepartamento", createDepartamento)