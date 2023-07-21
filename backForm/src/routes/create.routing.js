import { Router } from "express";
import { createDepartamento, createMunicipio, createPais, createUser, createVereda, getDepDependencia, getGroup, getMunDependencia, getPaises, getRol } from "../controllers/create.js";

export const create = Router()

create.post("/createPais", createPais)
create.get("/getPaises", getPaises)
create.post("/createDepartamento", createDepartamento)
create.post("/getDep", getDepDependencia)
create.post("/createMunicipio", createMunicipio)
create.post("/getMun", getMunDependencia)
create.post("/createVereda", createVereda)
create.post("/createUser",createUser)
create.get("/getRol", getRol)
create.get("/getGroup", getGroup)