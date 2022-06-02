import express from "express";
import {AddressInfo} from "net";
import cors from "cors";
import { noticeRouter } from "./routes/NoticeRouter";
import { userRouter } from "./routes/UserRouter";

const app = express();

app.use(express.json());
app.use(cors())
app.use("/users", userRouter);
app.use("/notices", noticeRouter);

const server = app.listen(3003, () => {
  if (server) {
    const address = server.address() as AddressInfo;
    console.log(`Server running at http://localhost:${address.port}`);
  } else {
    console.error(`Failure initializing server.`);
  }
});