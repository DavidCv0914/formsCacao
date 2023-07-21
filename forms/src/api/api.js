import axios from "axios";

let url = "http://localhost:4000";

export const createPais = async(values) =>
    await axios.post(`${url}/createPais`, values) 

export const getPaises = async() =>
    await axios.get(`${url}/getPaises`,) 

export const createDepartamento = async(values) =>
    await axios.post(`${url}/createDepartamento`, values)
    
export const getDep = async(values) =>
    await axios.post(`${url}/getDep`, values)

export const createMunicipio = async(values) =>
    await axios.post(`${url}/createMunicipio`, values)

export const getMun = async(values) =>
    await axios.post(`${url}/getMun`, values)   

export const createVereda = async(values) =>
    await axios.post(`${url}/createVereda`, values)

export const createUser = async(values) =>
    await axios.post(`${url}/createUser`, values)

export const getRol = async() =>
    await axios.get(`${url}/getRol`) 

export const getGroup = async() =>
    await axios.get(`${url}/getGroup`) 