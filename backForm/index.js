import express, { json } from "express";
import cors from "cors"
import { registro } from "./src/routes/registro.routing.js";

export const app = express();

app.use(cors())
app.use(json())
app.use(registro)

// Server -->
app.set('port',4000);
app.listen(app.get('port'), () => {
  console.log(`Server running FACE-JOB ${app.get('port')}`);
});