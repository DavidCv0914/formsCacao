import conexion from "../database/db.js";

export const getEmpresa = async (req, res) => {
    try {
      let { name,cod } = req.body;
      console.log(req.body);
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
  