import { useState, useEffect, useRef } from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { createUser, getGroup, getRol } from "../../api/api";
import { ModalSearch } from "../formSearch/ModalSearch";

export const FormUsuario = (props) => {

    const nameMunicipio = useRef(null)
    const nameEmpresa = useRef(null)
    const [rol, setRol] = useState([]);
    const [show, setShow] = useState(true);
    const [choice, setChoice] = useState([]);
    const [choiceEmpresa, setChoiceEmpresa] = useState([]);
    const [eventModal, setEventModal] = useState(false);
    const [type, setType] = useState("");
    const [user,setUser] = useState({id:"",name:"",email:"",mun:"",address:"",number:"",rol:0,nameEmpresa:"",password:""})

    const recibirDatos = (datos) => {

        if (datos.municipio) {
            setChoice(datos.municipio);
        }
        if (datos.empresa) {
            setChoiceEmpresa(datos.empresa);
        }
        setEventModal(datos.close);
    };

    const handleClose = () => {
        setShow(false);
        props.devolucion({ close: false })
    };

    const handleChange = (e) => {
        setUser({...user,[e.target.name]:e.target.value,mun:nameMunicipio.current.value,nameEmpresa:nameEmpresa.current.value})
    }

    useEffect(()=>{
        const loadRol = async () =>{
            const resp = await getRol();
            setRol(resp.data)
        };
        loadRol();
    },[])

    const handleCloseSave = async () => {
            
            const resp = await createUser({...user,nameEmpresa:nameEmpresa.current.value,mun:nameMunicipio.current.value})
            console.log(resp);
            if (resp.data == "create") {
                setShow(false);
                props.devolucion({ close: false });
            } else if (resp.data == "exist") {
                alert("El usuario ya extiste")
            } else if (resp.data == "no create") {
                alert("Hubo un error con la creacón")
            } else {
                alert("Hubo un error con la creación")
            }
        
    };


    return (
        <>
            <Modal size="lg" centered show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title style={{ color: "#5D1F06" }}>Registro de usuario</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form style={{display:"grid",gridTemplateColumns:"repeat(2, 1fr)",gridAutoRows:"minmax(auto, max-content)",gap:"10px"}}>
                        <Form.Group className="mb-3" >
                            <Form.Label style={{ color: "#5D1F06", fontWeight: "600" }}>Número de identificación</Form.Label>
                            <Form.Control
                                onChange={handleChange}
                                style={{ outlineColor: "#5D1F06", boxShadow: "0 0 5px #5D1F06", border: "solid 1px #5D1F06" }}
                                name="id"
                                type="text"
                                placeholder="Escriba..."
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Label style={{ color: "#5D1F06", fontWeight: "600" }}>Nombre completo</Form.Label>
                            <Form.Control
                                onChange={handleChange}
                                style={{ outlineColor: "#5D1F06", boxShadow: "0 0 5px #5D1F06", border: "solid 1px #5D1F06" }}
                                name="name"
                                type="text"
                                placeholder="Escriba..."
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Label style={{ color: "#5D1F06", fontWeight: "600" }}>Correo</Form.Label>
                            <Form.Control
                                onChange={handleChange}
                                style={{ outlineColor: "#5D1F06", boxShadow: "0 0 5px #5D1F06", border: "solid 1px #5D1F06" }}
                                name="email"
                                type="text"
                                placeholder="Escriba..."
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Label style={{ color: "#5D1F06", fontWeight: "600" }}>Contraseña</Form.Label>
                            <Form.Control
                                onChange={handleChange}
                                style={{ outlineColor: "#5D1F06", boxShadow: "0 0 5px #5D1F06", border: "solid 1px #5D1F06" }}
                                name="password"
                                type="password"
                                placeholder="Escriba..."
                            />
                        </Form.Group>
                        <Form.Group>
                        <Form.Label style={{ color: "#5D1F06", fontWeight: "600" }}>Municipio de residencia</Form.Label>
                        <InputGroup className="mb-3">
                            <Form.Control
                                ref={nameMunicipio}
                                placeholder="Escriba"
                                style={{ outlineColor: "#5D1F06", boxShadow: "0 0 5px #5D1F06", border: "solid 1px #5D1F06" }}
                                name="mun"
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
                                border: "solid 2px #5D1F06"
                            }}
                                
                                onClick={() => {
                                    setEventModal(!eventModal);
                                    setType("Municipio");
                                }}>
                                <box-icon name='search' color="rgb(255 255 255)"></box-icon>
                            </Button>
                        </InputGroup>
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Label style={{ color: "#5D1F06", fontWeight: "600" }}>Dirección</Form.Label>
                            <Form.Control
                                onChange={handleChange}
                                style={{ outlineColor: "#5D1F06", boxShadow: "0 0 5px #5D1F06", border: "solid 1px #5D1F06" }}
                                name="address"
                                type="text"
                                placeholder="Escriba..."
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Label style={{ color: "#5D1F06", fontWeight: "600" }}>Télefonos</Form.Label>
                            <Form.Control
                                onChange={handleChange}
                                style={{ outlineColor: "#5D1F06", boxShadow: "0 0 5px #5D1F06", border: "solid 1px #5D1F06" }}
                                name="number"
                                type="text"
                                placeholder="Escriba..."
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" >
                        <Form.Label style={{ color: "#5D1F06", fontWeight: "600" }}>Rol</Form.Label>
                        <Form.Select onChange={handleChange} name="rol" style={{height:"39.5px",outlineColor: "#5D1F06", boxShadow: "0 0 5px #5D1F06", border: "solid 1px #5D1F06"}} aria-label="Default select example">
                            <option>Rol de usuario</option>
                            {rol.length > 0 ? rol.map((i)=>(
                                <option key={i.idrol} value={i.idrol}>{i.nombre}</option>
                            )) 
                            : null}
                        </Form.Select>
                        </Form.Group>
                        <Form.Group>
                        <Form.Label style={{ color: "#5D1F06", fontWeight: "600" }}>Empresa</Form.Label>
                        <InputGroup className="mb-3">
                            <Form.Control
                                ref={nameEmpresa}
                                placeholder="Escriba"
                                style={{ outlineColor: "#5D1F06", boxShadow: "0 0 5px #5D1F06", border: "solid 1px #5D1F06" }}
                                name="mun"
                                defaultValue={choiceEmpresa ? choiceEmpresa.nombre : null}
                                onClick={() => {
                                    setEventModal(!eventModal);
                                    setType("Empresa");
                                }}
                            />
                            <Button style={{
                                display: "flex",
                                alignItems: "center",
                                backgroundColor: "#5D1F06",
                                border: "solid 2px #5D1F06"
                            }}
                                
                                onClick={() => {
                                    setEventModal(!eventModal);
                                    setType("Empresa");
                                }}>
                                <box-icon name='search' color="rgb(255 255 255)"></box-icon>
                            </Button>
                        </InputGroup>
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Label style={{ color: "#5D1F06", fontWeight: "600" }}>Foto</Form.Label>
                            <Form.Control
                                style={{ outlineColor: "#5D1F06", boxShadow: "0 0 5px #5D1F06", border: "solid 1px #5D1F06" }}
                                name="number"
                                type="file"
                                placeholder="Escriba..."
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancelar
                    </Button>
                    <Button style={{ backgroundColor: "#5D1F06", border: "solid 2px #5D1F06" }} onClick={handleCloseSave}>
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