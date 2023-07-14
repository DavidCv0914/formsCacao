import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { FormPais } from "./components/forms/FormPais";
import { FormDepartamento } from "./components/forms/FormDepartamento";

const App = () => {

  const [showPais, setShowPais] = useState(false);
  const [showDepartamento, setShowDepartamento] = useState(false);
  
  const handleShowPais = () => setShowPais(!showPais);
  const handleShowDepartamento = () => setShowDepartamento(!showDepartamento);

  const recibirDatos = (datos) => {
    setShowPais(datos.close);
  };
  const recibirDatosDepartamento = (datos) => {
    setShowDepartamento(datos.close);
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

      {showPais ? <FormPais devolucion={recibirDatos}/>: null}
      {showDepartamento ? <FormDepartamento devolucion={recibirDatosDepartamento}/>: null}
    </>
  )
}

export default App
