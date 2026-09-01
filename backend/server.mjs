import express from "express";
import cors from "cors";

import "./loadEnvironment.mjs";

import { connectToDatabase } from "./db/conn.mjs";
import recordRoutes from "./routes/record.mjs";

const PORT = process.env.PORT || 5050;

const app = express();

app.use(cors());
app.use(express.json());

app.use("/record", recordRoutes);

connectToDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.error(error);
  });