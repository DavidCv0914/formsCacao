import { useState } from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { createPais } from "../../api/api";

export const FormPais = (props)=>{

    const [show, setShow] = useState(true);
    const [namePais, setNamePais] = useState("");

    const handleClose = () => {
        setShow(false);
        props.devolucion({close:false})
    };

    const handleCloseSave = async() => {
        if (namePais=="") {
            alert("Ingrese el nombre del pais")
        }else{
            const resp = await createPais({name:namePais})
            if (resp.data == "create") {
               setShow(false);
                props.devolucion({close:false}) 
            }else if(resp.data == "exist"){
                alert("El pais ya extiste")
            }else if(resp.data == "no create"){
                alert("Hubo un error con la creacón")
            }else{
                alert("Hubo un error con la creación")
            }
            
        }
        
    };

    const handleChange = (e) =>{
        setNamePais(e.target.value)
    }
    return(
        <Modal centered show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title style={{color:"#5D1F06"}}>Crear País</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label style={{color:"#5D1F06",fontWeight:"600"}}>Nombre del País</Form.Label>
              <Form.Control
                style={{outlineColor:"#5D1F06",boxShadow:"0 0 5px #5D1F06",border:"solid 1px #5D1F06"}}
                onChange={handleChange}
                type="text"
                placeholder="Escriba..."
                autoFocus
              />
            </Form.Group>
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