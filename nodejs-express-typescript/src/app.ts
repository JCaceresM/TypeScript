import express from "express";
import todosRouters from "./routes/todos";
import { json } from "body-parser";

const app = express();
app.use("/todos", todosRouters);

app.use(json());

app.use(
  (
    error: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    res.status(500).json({ message: error.message });
  }
);
app.listen(3000);
