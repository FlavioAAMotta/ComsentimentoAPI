import express from "express";
import {AddressInfo} from "net";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors())

const server = app.listen(3003, () => {
  if (server) {
    const address = server.address() as AddressInfo;
    console.log(`Server running at http://localhost:${address.port}`);
  } else {
    console.error(`Failure initializing server.`);
  }
});