import { useState,useEffect,useRef } from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { createVereda } from "../../api/api";
import { ModalSearch } from "../formSearch/ModalSearch";

export const FormVereda = (props)=>{

    const nameMunicipio = useRef(null)
    const nameVereda = useRef(null)
    const [show, setShow] = useState(true);
    const [choice, setChoice] = useState([]);
    const [eventModal, setEventModal] = useState(false);
    const [type, setType] = useState("");

    const recibirDatos = (datos) => {

        if (datos.municipio) {
          setChoice(datos.municipio);
        }
        
        setEventModal(datos.close);
      };

    const handleClose = () => {
        setShow(false);
        props.devolucion({close:false})
    };

    const handleCloseSave = async() => {
        if (nameVereda.current.value == "" || nameMunicipio.current.value == "") {
            alert("Complete los campos")
        }else{
            const resp = await createVereda({name:nameVereda.current.value, mun:nameMunicipio.current.value})
            console.log(resp);
            if (resp.data == "create") {
                setShow(false);
                props.devolucion({close:false}); 
            }else if(resp.data == "exist"){
                alert("La Vereda ya extiste")
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
          <Modal.Title style={{color:"#5D1F06"}}>Crear Vereda</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label style={{color:"#5D1F06",fontWeight:"600"}}>Nombre de la vereda</Form.Label>
              <Form.Control
                ref={nameVereda}
                style={{outlineColor:"#5D1F06",boxShadow:"0 0 5px #5D1F06",border:"solid 1px #5D1F06"}}
                name="name"
                type="text"
                placeholder="Escriba..."
              />
            </Form.Group>
            
            <Form.Label style={{color:"#5D1F06",fontWeight:"600"}}>Nombre del municipio de procedencia</Form.Label>
            <InputGroup className="mb-3">
            <Form.Control 
              ref={nameMunicipio}
              placeholder="Escriba"
              style={{outlineColor:"#5D1F06",boxShadow:"0 0 5px #5D1F06",border:"solid 1px #5D1F06"}}
              defaultValue={choice ? choice.nombre : null}
              onClick={() => {
                setEventModal(!eventModal);
                setType("Municipio");
              }}
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
            setType("Municipio");
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