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
   
export const listEmpresa = async(values) =>
    await axios.post(`${url}/getEmpresa`, values) 

export const listPerson = async(values) =>
    await axios.post(`${url}/getPerson`, values)

export const getListPerson = async(values) =>
    await axios.get(`${url}/getPersonList`, values)

export const getPaisesName= async(values) =>
    await axios.post(`${url}/getPaisName`, values) 

export const getDepList = async(values) =>
    await axios.get(`${url}/getDepList`, values)

export const getMunList = async(values) =>
    await axios.get(`${url}/getMunList`, values)

export const getVeredaList = async(values) =>
    await axios.get(`${url}/getVeredaList`, values)

export const getVereda = async(values) =>
    await axios.post(`${url}/getVereda`, values)

export const updateUser = async(values) =>
    await axios.post(`${url}/updateUser`, values)