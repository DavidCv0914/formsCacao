import conexion from "../database/db.js";
import bcrypt from "bcrypt";

export const createPais = async (req, res) => {
  try {
    let { name } = req.body;
    
    if (name) {
      const [exist] = await conexion.query("SELECT nombre FROM paises WHERE nombre=?", [name]);
      if (exist.length == 0) {
        const [count] = await conexion.query(`SELECT COUNT(*) AS numero_registros FROM paises`);
        const [create] = await conexion.query("INSERT INTO paises(idpais,nombre) VALUES (?,?)", [count[0].numero_registros + 1, name])
        if (create.affectedRows) {
          
          res.json("create")
        } else {
          
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

export const getPaisesName = async (req, res) => {
  try {
    const {name} = req.body
    const [list] = await conexion.query(`SELECT * FROM paises WHERE nombre LIKE "%${name}%"`);

    res.json(list)

  } catch (error) {
    console.log(error);
    return res.status(404).json({ message: "ERROR 404", error });
  }
};

export const createDepartamento = async (req, res) => {
  try {
    let { name, pais } = req.body;
   
    if (name && pais) {
      const [exist] = await conexion.query("SELECT nombre FROM departamentos WHERE nombre=?", [name]);
      if (exist.length == 0) {
        const [count] = await conexion.query(`SELECT COUNT(*) AS numero_registros FROM departamentos`);
        const [paisConsult] = await conexion.query(`SELECT idpais FROM paises WHERE nombre = ?`, [pais]);
        const [create] = await conexion.query("INSERT INTO departamentos(iddepartamento,nombre,idpais) VALUES (?,?,?)", [count[0].numero_registros + 1, name, paisConsult[0].idpais])
        if (create.affectedRows) {
          res.json("create")
        } else {
          res.json("no create")
        }

      } else {
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
      const [resp] = await conexion.query(`SELECT * FROM departamentos WHERE nombre LIKE "%${name}%"`);

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

export const getDep = async (req, res) => {
  try {

      const [resp] = await conexion.query(`SELECT * FROM departamentos`);

      res.json(resp)
    
  } catch (error) {
    console.log(error);
    return res.status(404).json({ message: "ERROR 404", error });
  }
};

export const createMunicipio = async (req, res) => {
  try {
    let { name, dep } = req.body;
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
            res.json("no create")
          }

        } else {
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

export const createVereda = async (req, res) => {
  try {
    let { name, mun } = req.body;
    
    if (name && mun) {
      const [municipioConsult] = await conexion.query(`SELECT idmunicipio FROM municipios WHERE nombre = ?`, [mun]);
      if (municipioConsult.length > 0) {
        const [exist] = await conexion.query("SELECT nombre FROM veredas WHERE nombre=?", [name]);
        if (exist.length == 0) {
          const [count] = await conexion.query(`SELECT COUNT(*) AS numero_registros FROM veredas`);

          const [create] = await conexion.query("INSERT INTO veredas(idvereda,nombre,idmunicipio) VALUES (?,?,?)", [count[0].numero_registros + 1, name, municipioConsult[0].idmunicipio])
          if (create.affectedRows) {
            res.json("create")
          } else {
            
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

export const getMunDependencia = async (req, res) => {
  try {
    let { name, cod } = req.body

    if (name) {
      const [resp] = await conexion.query(`SELECT * FROM municipios WHERE nombre LIKE "%${name}%"`);
    
      res.json(resp)
    }

    if (cod) {
      const [resp] = await conexion.query(`SELECT * FROM municipios WHERE idmunicipio LIKE "%${cod}%"`);
      console.log(resp);
      res.json(resp)
    }

  } catch (error) {
    console.log(error);
    return res.status(404).json({ message: "ERROR 404", error });
  }
};

export const getMun = async (req, res) => {
  try {
      const [resp] = await conexion.query(`SELECT * FROM municipios`);
    
      res.json(resp)

  } catch (error) {
    console.log(error);
    return res.status(404).json({ message: "ERROR 404", error });
  }
};

export const getRol = async (req, res) => {
  try {

    const [rol] = await conexion.query("SELECT * FROM usuarios_roles");

    res.json(rol)

  } catch (error) {
    console.log(error);
    return res.status(404).json({ message: "ERROR 404", error });
  }
};

export const getGroup = async (req, res) => {
  try {

    const [rol] = await conexion.query("SELECT * FROM usuarios_grupos");

    res.json(rol)

  } catch (error) {
    console.log(error);
    return res.status(404).json({ message: "ERROR 404", error });
  }
};


export const createUser = async (req,res) => {
  try {
    let {id,name,email,mun,address,number,rol,nameEmpresa,password} = req.body
    const [exist] = await conexion.query("SELECT * FROM usuarios WHERE idusuario = ? OR correo = ?",[id,email])
    if (exist.length > 0) {
      res.json("exist")
    }else{
      const saltRounds = 10;
      const salt = bcrypt.genSaltSync(saltRounds);
      const hash = bcrypt.hashSync(password, salt);
      const [codEmpresa] = await conexion.query("SELECT idempresa FROM empresas WHERE nombre = ? ",[nameEmpresa]);
      const [codMun] = await conexion.query("SELECT idmunicipio FROM municipios WHERE nombre = ? ",[mun]);
      const [user] = await conexion.query("INSERT INTO usuarios (idusuario, nombre, correo, password, idmunicipio, direccion, telefonos, idrol, estado) VALUES (?,?,?,?,?,?,?,?,?)",[id,name,email,hash,codMun[0].idmunicipio,address,number,rol,"A"]);

      if (user.affectedRows != 0) {
        await conexion.query("INSERT INTO usuarios_empresas (idusuario,idempresa) Values (?,?)",[id,codEmpresa[0].idempresa]);
        res.json("create")
      }else{
        res.json("no create")
      }
    }
    
    
  } catch (error) {
    console.log(error);
    return res.status(404).json({ message: "ERROR 404", error }); 
  }
};

export const getEmpresa = async (req, res) => {
  try {
    let { name, cod } = req.body;
    if (name) {
      const [result] = await conexion.query(`SELECT * FROM empresas WHERE nombre LIKE "%${name}%"`)
      res.json(result);
    }
    if (cod) {
      const [result] = await conexion.query(`SELECT * FROM empresas WHERE nit LIKE "%${cod}%"`)
      res.json(result);
    }

  } catch (error) {
    console.log(error);
    return res.status(404).json({ message: "ERROR 404", error });
  }
};

export const getPerson = async (req, res) => {
  try {

    let { name, id } = req.body;
    if (name) {
      const [result] = await conexion.query(`SELECT * FROM usuarios WHERE nombre LIKE "%${name}%"`)
      res.json(result);
    }
    if (id) {
      const [result] = await conexion.query(`SELECT * FROM usuarios WHERE idusuario LIKE "%${id}%"`)
      res.json(result);
    }
  } catch (error) {
    console.log(error);
    return res.status(404).json({ message: "ERROR 404", error });
  }
}; 

export const getPersonList = async (req, res) => {
  try {
      const [result] = await conexion.query(`SELECT * FROM usuarios`)
      res.json(result);
  
  } catch (error) {
    console.log(error);
    return res.status(404).json({ message: "ERROR 404", error });
  }
}; 

export const getVeredaList = async (req, res) => {
  try {
      const [resp] = await conexion.query(`SELECT * FROM veredas`);
    
      res.json(resp)

  } catch (error) {
    console.log(error);
    return res.status(404).json({ message: "ERROR 404", error });
  }
};

export const getVereda = async (req, res) => {
  try {
    let { name} = req.body;
    if (name) {
      const [result] = await conexion.query(`SELECT * FROM veredas WHERE nombre LIKE "%${name}%"`)
      res.json(result);
    }
  } catch (error) {
    console.log(error);
    return res.status(404).json({ message: "ERROR 404", error });
  }
};

export const updateUser = async (req, res) => {
  try {
    let { id } = req.body;
    
      const [result] = await conexion.query(`SELECT * FROM usuarios WHERE idusuario = ?`,[id]);
      if (result[0].estado == "A") {
        const [update] = await conexion.query("UPDATE usuarios SET estado = 'I' WHERE idusuario = ?",[id]);
        if (update.affectedRows != 0) {
          res.json("update")
        }
      }
      if (result[0].estado == "I") {
        const [update] = await conexion.query("UPDATE usuarios SET estado = 'A' WHERE idusuario = ?",[id]);
        if (update.affectedRows != 0) {
          res.json("update")
        }
      }
  } catch (error) {
    console.log(error);
    return res.status(404).json({ message: "ERROR 404", error });
  }
};