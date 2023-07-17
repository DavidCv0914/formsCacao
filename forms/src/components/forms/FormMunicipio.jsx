import { useState,useEffect,useRef } from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { createMunicipio } from "../../api/api";
import { ModalSearch } from "../formSearch/ModalSearch";

export const FormMunicipio = (props)=>{

    const nameDepartamento = useRef(null)
    const nameMunicipio = useRef(null)
    const [show, setShow] = useState(true);
    const [choice, setChoice] = useState([]);
    const [eventModal, setEventModal] = useState(false);
    const [type, setType] = useState("");

    const recibirDatos = (datos) => {
        if (datos.empresa) {
          setChoice(datos.empresa);
        }
        if (datos.persona) {
          setPerson(datos.persona);
        }

        if (datos.departamento) {
            setChoice(datos.departamento);
          }
        
        setEventModal(datos.close);
      };

    const handleClose = () => {
        setShow(false);
        props.devolucion({close:false})
    };

    const handleCloseSave = async() => {


        if (nameMunicipio.current.value == "" || nameDepartamento.current.value == "") {
            alert("Complete los campos")
        }else{
            const resp = await createMunicipio({name:nameMunicipio.current.value,dep:nameDepartamento.current.value})
            if (resp.data == "create") {
                setShow(false);
                props.devolucion({close:false}); 
            }else if(resp.data == "exist"){
                alert("El Municipio ya extiste")
            }else if(resp.data == "no create"){
                alert("Hubo un error con la creacón")
            }else if(resp.data == "procedence invalid"){
                alert("La procedencia no existe")
            }else{
                alert("Hubo un error con la creación")
            }
        } 
    };

    return(
        <>
        <Modal centered show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title style={{color:"#5D1F06"}}>Crear Municipio</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label style={{color:"#5D1F06",fontWeight:"600"}}>Nombre del municipio</Form.Label>
              <Form.Control
                ref={nameMunicipio}
                style={{outlineColor:"#5D1F06",boxShadow:"0 0 5px #5D1F06",border:"solid 1px #5D1F06"}}
                name="name"
                type="text"
                placeholder="Escriba..."
              />
            </Form.Group>
            
            <Form.Label style={{color:"#5D1F06",fontWeight:"600"}}>Nombre del departamento de procedencia</Form.Label>
            <InputGroup className="mb-3">
            <Form.Control 
              ref={nameDepartamento}
              placeholder="Escriba"
              style={{outlineColor:"#5D1F06",boxShadow:"0 0 5px #5D1F06",border:"solid 1px #5D1F06"}}
              defaultValue={choice ? choice.nombre : null}
            />
            <Button style={{
                 display: "flex",
                 alignItems: "center",
                 backgroundColor: "#5D1F06",
                 border:"solid 2px #5D1F06"
               }}
            id="button-addon2" 
            onClick={() => {
            setEventModal(!eventModal);
            setType("Departamento");
          }}>
              <box-icon name='search' color="rgb(255 255 255)"></box-icon>
            </Button>
          </InputGroup>
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
      {eventModal ? (
          <ModalSearch search={{ type: type }} devolucion={recibirDatos} />
        ) : null}
      </>
    )
}