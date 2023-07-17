import conexion from "../database/db.js";

export const createPais = async (req, res) => {
  try {
    let { name } = req.body;
    console.log(req.body);
    if (name) {
      const [exist] = await conexion.query("SELECT nombre FROM paises WHERE nombre=?", [name]);
      if (exist.length == 0) {
        const [count] = await conexion.query(`SELECT COUNT(*) AS numero_registros FROM paises`);
        const [create] = await conexion.query("INSERT INTO paises(idpais,nombre) VALUES (?,?)", [count[0].numero_registros + 1, name])
        if (create.affectedRows) {
          console.log("create");
          res.json("create")
        } else {
          console.log(create);
          res.json("no create")
        }

      } else {
        console.log("exist");
        res.json("exist")
      }
    } else {
      res.json("Not information")
    }

  } catch (error) {
    console.log(error);
    return res.status(404).json({ message: "ERROR 404", error });
  }
};

export const getPaises = async (req, res) => {
  try {

    const [list] = await conexion.query("SELECT * FROM paises");

    res.json(list)

  } catch (error) {
    console.log(error);
    return res.status(404).json({ message: "ERROR 404", error });
  }
};

export const createDepartamento = async (req, res) => {
  try {
    let { name, pais } = req.body;
    console.log(req.body);
    if (name && pais) {
      const [exist] = await conexion.query("SELECT nombre FROM departamentos WHERE nombre=?", [name]);
      if (exist.length == 0) {
        const [count] = await conexion.query(`SELECT COUNT(*) AS numero_registros FROM departamentos`);
        const [paisConsult] = await conexion.query(`SELECT idpais FROM paises WHERE nombre = ?`, [pais]);
        const [create] = await conexion.query("INSERT INTO departamentos(iddepartamento,nombre,idpais) VALUES (?,?,?)", [count[0].numero_registros + 1, name, paisConsult[0].idpais])
        if (create.affectedRows) {
          console.log("create");
          res.json("create")
        } else {
          console.log(create);
          res.json("no create")
        }

      } else {
        console.log("exist");
        res.json("exist")
      }
    } else {
      res.json("Not information")
    }

  } catch (error) {
    console.log(error);
    return res.status(404).json({ message: "ERROR 404", error });
  }
};

export const getDepDependencia = async (req, res) => {
  try {
    let { name, cod } = req.body

    if (name) {
      console.log(req.body);
      const [resp] = await conexion.query(`SELECT * FROM departamentos WHERE nombre LIKE "%${name}%"`);
      console.log(resp);
      res.json(resp)
    }

    if (cod) {
      const [resp] = await conexion.query(`SELECT * FROM departamentos WHERE iddepartamento LIKE "%${cod}%"`);
      console.log(resp);
      res.json(resp)
    }

  } catch (error) {
    console.log(error);
    return res.status(404).json({ message: "ERROR 404", error });
  }
};

export const createMunicipio = async (req, res) => {
  try {
    let { name, dep } = req.body;
    console.log(req.body);
    if (name && dep) {
      const [departamentoConsult] = await conexion.query(`SELECT iddepartamento FROM departamentos WHERE nombre = ?`, [dep]);
      if (departamentoConsult.length > 0) {
        const [exist] = await conexion.query("SELECT nombre FROM municipios WHERE nombre=?", [name]);
        if (exist.length == 0) {
          const [count] = await conexion.query(`SELECT COUNT(*) AS numero_registros FROM municipios`);

          const [create] = await conexion.query("INSERT INTO municipios(idmunicipio,nombre,iddepartamento) VALUES (?,?,?)", [count[0].numero_registros + 1, name, departamentoConsult[0].iddepartamento])
          if (create.affectedRows) {
            res.json("create")
          } else {
            console.log(create);
            res.json("no create")
          }

        } else {
          console.log("exist");
          res.json("exist")
        }
      } else {
        res.json("procedence invalid")
      }

    } else {
      res.json("Not information")
    }

  } catch (error) {
    console.log(error);
    return res.status(404).json({ message: "ERROR 404", error });
  }
};