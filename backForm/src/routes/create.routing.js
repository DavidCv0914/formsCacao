import { Router } from "express";
import { createDepartamento, createMunicipio, createPais, getDepDependencia, getPaises } from "../controllers/create.js";

export const create = Router()

create.post("/createPais", createPais)
create.get("/getPaises", getPaises)
create.post("/createDepartamento", createDepartamento)
create.post("/getDep", getDepDependencia)
create.post("/createMunicipio", createMunicipio)