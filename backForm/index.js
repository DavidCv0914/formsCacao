import express, { json } from "express";
import cors from "cors"
import { create } from "./src/routes/create.routing.js";
import fileUpload from "express-fileupload";

export const app = express();

app.use(cors())
app.use(json())
app.use(create)
app.use(fileUpload({
  useTempFiles : true,
  tempFileDir : './upload'
}));

// Server -->
app.set('port',4000);
app.listen(app.get('port'), () => {
  console.log(`Server running ${app.get('port')}`);
});