import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import AuthRoutes from "./routes/AuthRoutes";
import ContentRoutes from "./routes/ContentRoutes";
import LinkRoutes from "./routes/LinkRoutes";
import { MONGODB_URL, PORT } from "./config";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors())


app.use("/api/v1/auth", AuthRoutes)

app.use("/api/v1/content", ContentRoutes)

app.use("/api/v1/brain", LinkRoutes)

const port =  PORT || 3000 ;
mongoose
    .connect(MONGODB_URL!)
    .then(() => {
      console.log("Database connnected successfully");
      app.listen(port, ()=> {
        console.log(`Your App is listening on ${port}`)
    });
    })
    .catch((err) => {
      console.log("serror is happening", err);
    });


