import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import { FormPais } from "./components/forms/FormPais";
import { FormDepartamento } from "./components/forms/FormDepartamento";
import { FormMunicipio } from "./components/forms/FormMunicipio";
import { FormVereda } from "./components/forms/FormVereda";
import { FormUsuario } from "./components/forms/FormUsuario";
import { getDep, getDepList, getListPerson, getMun, getMunList, getPaises, getPaisesName, getVereda, getVeredaList, listPerson, updateUser } from "./api/api";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";

const App = () => {
  const [showPais, setShowPais] = useState(false);
  const [showDepartamento, setShowDepartamento] = useState(false);
  const [showMunicipio, setShowMunicipio] = useState(false);
  const [showVereda, setShowVereda] = useState(false);
  const [showUsuario, setShowUsuario] = useState(false);
  const [infoPais, setInfoPais] = useState([]);
  const [infoDep, setInfoDep] = useState([]);
  const [infoMun, setInfoMun] = useState([]);
  const [infoVereda, setInfoVereda] = useState([]);
  const [infoUsuario, setInfoUsuario] = useState([]);
  const [booleanUpdate,setBooleanUpdate] = useState(true);

  const handleShowPais = () => setShowPais(!showPais);
  const handleShowDepartamento = () => setShowDepartamento(!showDepartamento);
  const handleShowMunicipio = () => setShowMunicipio(!showMunicipio);
  const handleShowVereda = () => setShowVereda(!showVereda);
  const handleShowUsuario = () => setShowUsuario(!showUsuario);

  const recibirDatos = (datos) => {
    setShowPais(datos.close);
  };
  const recibirDatosDepartamento = (datos) => {
    setShowDepartamento(datos.close);
  };

  const recibirDatosMunicipio = (datos) => {
    setShowMunicipio(datos.close);
  };

  const recibirDatosVereda = (datos) => {
    setShowVereda(datos.close);
  };

  const recibirDatosUsuario = (datos) => {
    setShowUsuario(datos.close);
  };

  const handleChangePais = async (e) => {
    if (e.target.value == "") {
      const resp = await getPaises();
      setInfoPais(resp.data);
    }else{
      const loadPais = await getPaisesName({name:e.target.value})
      setInfoPais(loadPais.data);
    }
  };

  const handleChangeDepartamento = async (e) => {
    if (e.target.value == "") {
      const resp = await getDepList();
      setInfoDep(resp.data);
    }else{
      const loadDep = await getDep({name:e.target.value})
      setInfoDep(loadDep.data);
    }
    
  };

  const handleChangeMunicipio = async (e) => {
    if (e.target.value == "") {
      const resp = await getMunList();
      setInfoMun(resp.data);
    }else{
      const loadMun = await getMun({name:e.target.value})
      setInfoMun(loadMun.data);
    }
    
  };

  const handleChangeVereda = async (e) => {
    if (e.target.value == "") {
      const resp = await getVeredaList();
      setInfoVereda(resp.data);
    }else{
      const loadMun = await getVereda({name:e.target.value})
      setInfoVereda(loadMun.data);
    }
    
  };

  const handleChangeUsuario = async (e) => {
    if (e.target.value == "") {
      const resp = await getListPerson();
      setInfoUsuario(resp.data);
    }else{
      const loadUser= await listPerson({name:e.target.value})
      setInfoUsuario(loadUser.data);
    }
    
  };

  const update = async(id) => {
    const resp = await updateUser({id:id})
    if (resp.data == "update") {
      setBooleanUpdate(!booleanUpdate)
      console.log("update");
    }
  }

  useEffect(() => {
    const loadPaises = async () => {
      const resp = await getPaises();
      setInfoPais(resp.data);
    };
    loadPaises();
    
    const loadDep = async () => {
      const resp = await getDepList();
      setInfoDep(resp.data);
    };
    loadDep();
    const loadMun = async () => {
      const resp = await getMunList();
      setInfoMun(resp.data);
    };
    loadMun();
    const loadVereda = async () => {
      const resp = await getVeredaList();
      setInfoVereda(resp.data);
    };
    loadVereda();
    const loadUsuario = async () => {
      const resp = await getListPerson();
      setInfoUsuario(resp.data);
    };
    loadUsuario();
  }, [booleanUpdate]);

  return (
    <>
      <section
        style={{ display: "flex", flexDirection: "column", height: "100vh" }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            marginTop: "10vh",
          }}
        >
          <Button
            style={{
              backgroundColor: "#5D1F06",
              border: "solid 2px #5D1F06",
            }}
            onClick={handleShowPais}
          >
            Crear Pais
          </Button>
          <Form.Group style={{ width: "400px" }}>
            <InputGroup className="mb-3">
              <Form.Control
                onChange={handleChangePais}
                placeholder="Escriba"
                style={{
                  outlineColor: "#5D1F06",
                  boxShadow: "0 0 5px #5D1F06",
                  border: "solid 1px #5D1F06",
                }}
                name="pais"
              />
              <Button
                style={{
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: "#5D1F06",
                  border: "solid 2px #5D1F06",
                }}
                id="button-addon2"
              >
                <box-icon name="search" color="rgb(255 255 255)"></box-icon>
              </Button>
            </InputGroup>
          </Form.Group>
        </div>
        <div style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "10vh",
          }}>
        <table style={{width : "700px",border:"solid 2px #5D1F06",}}>
          <thead style={{backgroundColor:"#5D1F06",color:"#FFFFFF"}}>
            <tr>
              <th scope="col">Id del Pais</th>
              <th scope="col">Nombre del Pais</th>
            </tr>
          </thead>
          <tbody>
            {infoPais.map((val) => {
              return (
                <tr key={val.idpais}>
                  <td>{val.idpais}</td>
                  <td>{val.nombre}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        </div>
      </section>

      <section
        style={{ display: "flex", flexDirection: "column", height: "100vh" }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            marginTop: "10vh",
          }}
        >
          <Button  style={{
              backgroundColor: "#5D1F06",
              border: "solid 2px #5D1F06",
            }}
          onClick={handleShowDepartamento}>
            Crear Departamento
          </Button>
          <Form.Group style={{ width: "400px" }}>
            <InputGroup className="mb-3">
              <Form.Control
                onChange={handleChangeDepartamento}
                placeholder="Escriba"
                style={{
                  outlineColor: "#5D1F06",
                  boxShadow: "0 0 5px #5D1F06",
                  border: "solid 1px #5D1F06",
                }}
                name="pais"
              />
              <Button
                style={{
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: "#5D1F06",
                  border: "solid 2px #5D1F06",
                }}
                id="button-addon2"
              >
                <box-icon name="search" color="rgb(255 255 255)"></box-icon>
              </Button>
            </InputGroup>
          </Form.Group>
        </div>
        <div style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "10vh",
          }}>
        <table style={{width : "700px",border:"solid 2px #5D1F06",}}>
          <thead style={{backgroundColor:"#5D1F06",color:"#FFFFFF"}}>
            <tr>
              <th scope="col">Id del Departamento</th>
              <th scope="col">Nombre del Departamento</th>
            </tr>
          </thead>
          <tbody>
            {infoDep.map((val) => {
              return (
                <tr key={val.iddepartamento}>
                  <td>{val.iddepartamento}</td>
                  <td>{val.nombre}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        </div>
      </section>

      <section
        style={{ display: "flex", flexDirection: "column", height: "100vh" }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            marginTop: "10vh",
          }}
        >

          <Button style={{
              backgroundColor: "#5D1F06",
              border: "solid 2px #5D1F06",
            }}
           onClick={handleShowMunicipio}>
            Crear Municipio
          </Button>
          <Form.Group style={{ width: "400px" }}>
            <InputGroup className="mb-3">
              <Form.Control
                onChange={handleChangeMunicipio}
                placeholder="Escriba"
                style={{
                  outlineColor: "#5D1F06",
                  boxShadow: "0 0 5px #5D1F06",
                  border: "solid 1px #5D1F06",
                }}
                name="pais"
              />
              <Button
                style={{
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: "#5D1F06",
                  border: "solid 2px #5D1F06",
                }}
                id="button-addon2"
              >
                <box-icon name="search" color="rgb(255 255 255)"></box-icon>
              </Button>
            </InputGroup>
          </Form.Group>
        </div>
        <div style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "10vh",
          }}>
        <table style={{width : "700px",border:"solid 2px #5D1F06",}}>
          <thead style={{backgroundColor:"#5D1F06",color:"#FFFFFF"}}>
            <tr>
              <th scope="col">Id del Municipio</th>
              <th scope="col">Nombre del Municipio</th>
            </tr>
          </thead>
          <tbody>
            {infoMun.map((val) => {
              return (
                <tr key={val.idmunicipio}>
                  <td>{val.idmunicipio}</td>
                  <td>{val.nombre}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        </div>
      </section>

      <section
        style={{ display: "flex", flexDirection: "column", height: "100vh" }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            marginTop: "10vh",
          }}
        >

          <Button style={{
              backgroundColor: "#5D1F06",
              border: "solid 2px #5D1F06",
            }}
           onClick={handleShowVereda}>
            Crear Vereda
          </Button>
          <Form.Group style={{ width: "400px" }}>
            <InputGroup className="mb-3">
              <Form.Control
                onChange={handleChangeVereda}
                placeholder="Escriba"
                style={{
                  outlineColor: "#5D1F06",
                  boxShadow: "0 0 5px #5D1F06",
                  border: "solid 1px #5D1F06",
                }}
                name="pais"
              />
              <Button
                style={{
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: "#5D1F06",
                  border: "solid 2px #5D1F06",
                }}
                id="button-addon2"
              >
                <box-icon name="search" color="rgb(255 255 255)"></box-icon>
              </Button>
            </InputGroup>
          </Form.Group>
        </div>
        <div style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "10vh",
          }}>
        <table style={{width : "700px",border:"solid 2px #5D1F06",}}>
          <thead style={{backgroundColor:"#5D1F06",color:"#FFFFFF"}}>
            <tr>
              <th scope="col">Id de la vereda</th>
              <th scope="col">Nombre de la vereda</th>
            </tr>
          </thead>
          <tbody>
            {infoVereda.map((val) => {
              return (
                <tr key={val.idmunicipio}>
                  <td>{val.idmunicipio}</td>
                  <td>{val.nombre}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        </div>
      </section>

      <section
        style={{ display: "flex", flexDirection: "column", height: "100vh" }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            marginTop: "10vh",
          }}
        >

          <Button style={{
              backgroundColor: "#5D1F06",
              border: "solid 2px #5D1F06",
            }}
           onClick={handleShowUsuario}>
            Crear Usuario
          </Button>
          <Form.Group style={{ width: "400px" }}>
            <InputGroup className="mb-3">
              <Form.Control
                onChange={handleChangeUsuario}
                placeholder="Escriba"
                style={{
                  outlineColor: "#5D1F06",
                  boxShadow: "0 0 5px #5D1F06",
                  border: "solid 1px #5D1F06",
                }}
                name="pais"
              />
              <Button
                style={{
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: "#5D1F06",
                  border: "solid 2px #5D1F06",
                }}
                id="button-addon2"
              >
                <box-icon name="search" color="rgb(255 255 255)"></box-icon>
              </Button>
            </InputGroup>
          </Form.Group>
        </div>
        <div style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "10vh",
          }}>
        <table style={{width : "800px",border:"solid 2px #5D1F06",}}>
          <thead style={{backgroundColor:"#5D1F06",color:"#FFFFFF"}}>
            <tr>
              <th scope="col">Id del usuario</th>
              <th scope="col">Nombre</th>
              <th scope="col">Correo</th>
              <th scope="col">Télefono</th>
              <th scope="col">Estado</th>
              <th scope="col">Editar</th>
            </tr>
          </thead>
          <tbody>
            {infoUsuario.map((val) => {
              return (
                <tr key={val.idusuario}>
                  <td>{val.idusuario}</td>
                  <td>{val.nombre}</td>
                  <td>{val.correo}</td>
                  <td>{val.telefonos}</td>
                  <td>{val.estado == "A" ? "Activo" : "Inactivo"}</td>
                  <td>{val.estado == "A" ? <Button variant="danger" onClick={() => update(val.idusuario)}>Inactivar</Button> : <Button variant="success" onClick={() => update(val.idusuario)}>Activar</Button>}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        </div>
      </section>

      {showPais ? <FormPais devolucion={recibirDatos} /> : null}
      {showDepartamento ? (
        <FormDepartamento devolucion={recibirDatosDepartamento} />
      ) : null}
      {showMunicipio ? (
        <FormMunicipio devolucion={recibirDatosMunicipio} />
      ) : null}
      {showVereda ? <FormVereda devolucion={recibirDatosVereda} /> : null}
      {showUsuario ? <FormUsuario devolucion={recibirDatosUsuario} /> : null}

    </>
  );
};

export default App;
