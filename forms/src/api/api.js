import axios from "axios";

let url = "http://localhost:4000";

export const createPais = async(values) =>
    await axios.post(`${url}/createPais`, values) 

export const getPaises = async(values) =>
    await axios.get(`${url}/getPaises`, values) 

export const createDepartamento = async(values) =>
    await axios.post(`${url}/createDepartamento`, values)
    
export const getDep = async(values) =>
    await axios.post(`${url}/getDep`, values)

export const createMunicipio = async(values) =>
    await axios.post(`${url}/createMunicipio`, values)