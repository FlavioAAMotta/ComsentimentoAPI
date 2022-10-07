import express from "express";
import { AddressInfo } from "net";
import cors from "cors";
import { noticeRouter } from "./routes/NoticeRouter";
import { userRouter } from "./routes/UserRouter";
import multer from "multer";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors())
app.use("/", (req, res) => {
  res.send("Hello World");
});
app.use("/users", userRouter);
app.use("/notices", noticeRouter);
let fileName = ""
var storage = multer.diskStorage(
  {
    destination: './uploads/',
    filename: function (req, file, cb) {
      fileName = Date.now() + "-" + file.originalname;
      cb(null, fileName);
    }
  }
);
const upload = multer({ storage })


app.use('/pdf', express.static(__dirname + '/uploads'));
// Single file
app.post("/pdfFile", upload.single("file"), (req, res) => {
  console.log(fileName)
  return res.send(fileName)
})

const server = app.listen(process.env.PORT || 3003, () => {
  if (server) {
    const address = server.address() as AddressInfo;
    console.log(`Server running at http://localhost:${address.port}`);
  } else {
    console.error(`Failure initializing server.`);
  }
});