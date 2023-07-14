import { useState,useEffect } from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { getPaises,createDepartamento } from "../../api/api";

export const FormDepartamento = (props)=>{

    const [show, setShow] = useState(true);
    const [departamento, setDepartamento] = useState({name:"",pais:""});
    const [paises,setPaises] = useState([])

    const handleClose = () => {
        setShow(false);
        props.devolucion({close:false})
    };

    useEffect(()=>{
        const listPaises = async ()=>{
            const resp = await getPaises();
            setPaises(resp.data)
        }
        listPaises();
    },[])

    const handleCloseSave = async() => {
        if (departamento.name == "" || departamento.pais == "") {
            alert("Complete los campos")
        }else{
            const resp = await createDepartamento(departamento)
            if (resp.data == "create") {
               setShow(false);
                props.devolucion({close:false}) 
            }else if(resp.data == "exist"){
                alert("El Departamento ya extiste")
            }else if(resp.data == "no create"){
                alert("Hubo un error con la creacón")
            }else{
                alert("Hubo un error con la creación")
            }
        } 
    };

    const handleChange = (e) =>{
        setDepartamento({...departamento,[e.target.name]:e.target.value})
    }

    return(
        <Modal centered show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title style={{color:"#5D1F06"}}>Crear Departamento</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label style={{color:"#5D1F06",fontWeight:"600"}}>Nombre del departamento</Form.Label>
              <Form.Control
                style={{outlineColor:"#5D1F06",boxShadow:"0 0 5px #5D1F06",border:"solid 1px #5D1F06"}}
                name="name"
                onChange={handleChange}
                type="text"
                placeholder="Escriba..."
              />
            </Form.Group>
            <Form.Select style={{outlineColor:"#5D1F06",boxShadow:"0 0 5px #5D1F06",border:"solid 1px #5D1F06"}} name="pais" onChange={handleChange} aria-label="Default select example">
                <option>Elige el pais de procedencia</option>
                {paises.length > 0 ?paises.map((pais)=>(
                    <option key={pais.idpais} value={pais.nombre}>{pais.nombre}</option>
                ))
                : null}
                
            </Form.Select>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button style={{backgroundColor:"#5D1F06", border:"solid 2px #5D1F06"}} onClick={handleCloseSave}>
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>
    )
}