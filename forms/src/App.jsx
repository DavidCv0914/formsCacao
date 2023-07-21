import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { FormPais } from "./components/forms/FormPais";
import { FormDepartamento } from "./components/forms/FormDepartamento";
import { FormMunicipio } from "./components/forms/FormMunicipio";
import { FormVereda } from "./components/forms/FormVereda";
import { FormUsuario } from './components/forms/FormUsuario';

const App = () => {

  const [showPais, setShowPais] = useState(false);
  const [showDepartamento, setShowDepartamento] = useState(false);
  const [showMunicipio, setShowMunicipio] = useState(false);
  const [showVereda, setShowVereda] = useState(false);
  const [showUsuario, setShowUsuario] = useState(false);
  
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

  return (
    <>
     <Button variant="primary" onClick={handleShowPais}>
        Crear Pais
      </Button>
      {" "}
      <Button variant="primary" onClick={handleShowDepartamento}>
        Crear Departamento
      </Button>
      {" "}
      <Button variant="primary" onClick={handleShowMunicipio}>
        Crear Municipio
      </Button>
      {" "}
      <Button variant="primary" onClick={handleShowVereda}>
        Crear Vereda
      </Button>
      {" "}
      <Button variant="primary" onClick={handleShowUsuario}>
        Crear Usuario
      </Button>

      {showPais ? <FormPais devolucion={recibirDatos}/>: null}
      {showDepartamento ? <FormDepartamento devolucion={recibirDatosDepartamento}/>: null}
      {showMunicipio ? <FormMunicipio devolucion={recibirDatosMunicipio}/>: null}
      {showVereda ? <FormVereda devolucion={recibirDatosVereda}/>: null}
      {showUsuario ? <FormUsuario devolucion={recibirDatosVereda}/>: null}

    </>
  )
}

export default App
