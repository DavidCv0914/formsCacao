import { Router } from "express";
import { createDepartamento, createMunicipio, createPais, createUser, createVereda, getDep, getDepDependencia, getEmpresa, getGroup, getMun, getMunDependencia, getPaises, getPaisesName, getPerson, getPersonList, getRol, getVereda, getVeredaList, updateUser } from "../controllers/create.js";

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
create.post("/getEmpresa", getEmpresa);
create.post("/getPerson", getPerson);
create.post("/getPaisName", getPaisesName);
create.get("/getDepList", getDep);
create.get("/getMunList", getMun);
create.post("/getVereda", getVereda);
create.get("/getVeredaList", getVeredaList);
create.get("/getPersonList", getPersonList);
create.post("/updateUser", updateUser);