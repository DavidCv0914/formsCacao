import { useState, useEffect, useRef } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import InputGroup from "react-bootstrap/InputGroup";
import 'boxicons';
// import { listEmpresa, listPerson } from "../../api/api";
import { getDep } from "../../api/api";

export const ModalSearch = (props) => {
    const element = useRef(null)
    const [show, setShow] = useState(true);
    const [options, setOptions] = useState([]);
    const [typeSearch, setTypeSearch] = useState("");
    const [content, setContent] = useState("");
    const [choice, setChoice] = useState([]);
    const [placeHolder, setPlaceHolder] = useState("");

    useEffect(() => {
        if (props.search.type == "Empresa") {
            setPlaceHolder("Por codigo")
        }
        if (props.search.type == "Persona") {
            setPlaceHolder("Por identificación")
        }
        if (props.search.type == "Departamento") {
            setPlaceHolder("Por codigo")
        }
    }, [props]);
    const handleCloseSave = () => {
        setShow(false);
        switch (props.search.type) {
            case "Empresa":
                props.devolucion({ empresa: choice, close: false });
                break;
            case "Persona":
                props.devolucion({ persona: choice, close: false });
                break;
            case "Departamento":
                props.devolucion({ departamento: choice, close: false });
                break;
            default:
                break;
        }
    };
    const handleClose = () => {
        setShow(false);
        props.devolucion({ close: false });
    };

    const searchInfo = async () => {

        switch (props.search.type) {
            case "Empresa":
                if (typeSearch == "nombre") {
                    const result = await listEmpresa({ name: content });
                    setOptions(result.data);
                } else if (typeSearch == "codigo") {
                    const result = await listEmpresa({ cod: content });
                    setOptions(result.data);
                }
                break;
            case "Persona":
                if (typeSearch == "nombre") {
                    const result = await listPerson({ name: content });
                    setOptions(result.data);
                } else if (typeSearch == "codigo") {
                    const result = await listPerson({ id: content });
                    setOptions(result.data);
                }
                break;
            case "Departamento":
                if (typeSearch == "nombre") {
                    const result = await getDep({ name: content });
                    setOptions(result.data);
                } else if (typeSearch == "codigo") {
                    const result = await getDep({ cod: content });
                    setOptions(result.data);
                }
                break;
            default:
                break;
        }
    };

    useEffect(() => {
        const handleKeyDown = (event) => {
            const scrollableElement = element.current;

            if (event.key === 'ArrowUp') {
                scrollableElement.scrollTop -= 10;
                event.preventDefault();
            }

            if (event.key === 'ArrowDown') {
                scrollableElement.scrollTop += 10;
                event.preventDefault();
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    const handleStyle = (option) => {
        if (choice.idempresa == option.idempresa) {
            return { backgroundColor: "#76A6E7", cursor: "pointer" }
        } else {
            return { backgroundColor: "initial", cursor: "pointer" }
        }
    }

    return (
        <>
            <Modal centered show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            {["radio"].map((type) => (
                                <div key={`inline-${type}`} className="mb-3">
                                    <Form.Check
                                        inline
                                        label="Por nombre"
                                        checked={typeSearch == "nombre"}
                                        onChange={(e) => setTypeSearch(e.target.value)}
                                        value="nombre"
                                        name="group1"
                                        type={type}
                                        id={`inline-${type}-1`}
                                    />
                                    <Form.Check
                                        inline
                                        label={placeHolder}
                                        checked={typeSearch == "codigo"}
                                        onChange={(e) => setTypeSearch(e.target.value)}
                                        value="codigo"
                                        name="group1"
                                        type={type}
                                        id={`inline-${type}-2`}
                                    />
                                </div>
                            ))}
                            <InputGroup className="mb-3">
                                <Form.Control
                                    placeholder={"Busque su " + props.search.type}
                                    aria-label="Recipient's username"
                                    aria-describedby="basic-addon2"
                                    onChange={(e) => setContent(e.target.value)}
                                />
                                <Button
                                    variant="outline-secondary"
                                    id="button-addon2"
                                    onClick={searchInfo}
                                >
                                    Buscar
                                </Button>
                            </InputGroup>
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1"
                        >
                            {options.length > 2 ? <Container ref={element} style={{ overflowY: "scroll", height: "100px" }}>
                                {options.length > 0 ? (
                                    <Form.Label>{props.search.type + " a escoger"}</Form.Label>
                                ) : null}
                                {options.length > 0 && props.search.type == "Empresa"
                                    ? options.map((option) => (
                                        <Row className="col" key={option.idempresa}>
                                            <Col style={handleStyle(option)} xs={12} md={8} onClick={() => setChoice(option)}>
                                                nit: {option.nit}
                                            </Col>
                                            <Col style={handleStyle(option)} xs={6} md={4} onClick={() => setChoice(option)}>
                                                {option.nombre}
                                            </Col>
                                        </Row>
                                    ))
                                    : null}
                                {options.length > 0 && props.search.type == "Persona"
                                    ? options.map((option) => (
                                        <Row className="col" key={option.idusuario}>
                                            <Col style={handleStyle(option)} xs={12} md={8} onClick={() => setChoice(option)}>
                                                identificación: {option.idusuario}
                                            </Col>
                                            <Col style={handleStyle(option)} xs={6} md={4} onClick={() => setChoice(option)}>
                                                {option.nombre}
                                            </Col>
                                        </Row>
                                    ))
                                    : null}
                                {options.length > 0 && props.search.type == "Departamento"
                                    ? options.map((option) => (
                                        <Row className="col" key={option.iddepartamento}>
                                            <Col xs={12} md={8} onClick={() => setChoice(option)}>
                                                codigo: {option.iddepartamento}
                                            </Col>
                                            <Col xs={6} md={4} onClick={() => setChoice(option)}>
                                                {option.nombre}
                                            </Col>
                                        </Row>
                                    ))
                                    : null}
                            </Container> :

                                <Container ref={element} style={{ height: "100px" }}>
                                    {options.length > 0 ? (
                                        <Form.Label>{props.search.type + " a escoger"}</Form.Label>
                                    ) : null}
                                    {options.length > 0 && props.search.type == "Empresa"
                                        ? options.map((option) => (
                                            <Row className="col" key={option.idempresa}>
                                                <Col style={{ cursor: "pointer" }} xs={12} md={8} onClick={() => setChoice(option)}>
                                                    nit: {option.nit}
                                                </Col>
                                                <Col style={{ cursor: "pointer" }} xs={6} md={4} onClick={() => setChoice(option)}>
                                                    {option.nombre}
                                                </Col>
                                            </Row>
                                        ))
                                        : null}
                                    {options.length > 0 && props.search.type == "Persona"
                                        ? options.map((option) => (
                                            <Row className="col" key={option.idusuario}>
                                                <Col style={{ cursor: "pointer" }} xs={12} md={8} onClick={() => setChoice(option)}>
                                                    identificación: {option.idusuario}
                                                </Col>
                                                <Col style={{ cursor: "pointer" }} xs={6} md={4} onClick={() => setChoice(option)}>
                                                    {option.nombre}
                                                </Col>
                                            </Row>
                                        ))
                                        : null}
                                    {options.length > 0 && props.search.type == "Departamento"
                                    ? options.map((option) => (
                                        <Row className="col" key={option.iddepartamento}>
                                            <Col xs={12} md={8} onClick={() => setChoice(option)}>
                                                codigo: {option.iddepartamento}
                                            </Col>
                                            <Col xs={6} md={4} onClick={() => setChoice(option)}>
                                                {option.nombre}
                                            </Col>
                                        </Row>
                                    ))
                                    : null}
                                </Container>}
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cerrar
                    </Button>
                    <Button variant="primary" onClick={handleCloseSave}>
                        Aceptar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};