import express from "express";
import {AddressInfo} from "net";
import cors from "cors";
import { noticeRouter } from "./routes/NoticeRouter";
import { userRouter } from "./routes/UserRouter";
import multer from "multer";
const FormData = require('form-data');
const upload = multer({ dest: './uploads/' })

const app = express();

app.use(express.json());
app.use(cors())
app.use("/users", userRouter);
app.use("/notices", noticeRouter);
app.use('/pdf', express.static(__dirname + '/uploads'));
// Single file
app.post("/pdfFile", upload.single("file"), (req, res) => {
  console.log(req.body)
  console.log(req.file)
  return res.send("Single file")
})

const server = app.listen(3003, () => {
  if (server) {
    const address = server.address() as AddressInfo;
    console.log(`Server running at http://localhost:${address.port}`);
  } else {
    console.error(`Failure initializing server.`);
  }
});