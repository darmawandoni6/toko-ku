import express, { Application } from "express";

import cookieParser from "cookie-parser";
import cors from "cors";
import env from "dotenv";
import fileUpload from "express-fileupload";
import createHttpError from "http-errors";
import logger from "morgan";

import barangRouter from "@modules/barang/route";
import beliRouter from "@modules/beli/route";
import beliDetailRouter from "@modules/beliDetail/route";
import jualRouter from "@modules/jual/route";
import kategoriRouter from "@modules/kategori/route";
import returRouter from "@modules/retur/route";
import settingRouter from "@modules/setting/route";
import suplierRouter from "@modules/suplier/route";
import userRouter from "@modules/user/route";

import { errorHandler } from "./middleware/handlingError";

class App {
  app: Application;
  port: number;
  message: string;
  constructor() {
    env.config();

    this.app = express();
    this.port = parseInt(process.env.PORT as string, 10) || 8000;

    this.message = `[Server]: I am running mode ${process.env.ENV} at http://localhost:${this.port}`;

    this.plugins();
    this.routes();
  }

  private plugins(): void {
    this.app.use(
      cors({
        credentials: true,
        origin: true,
      }),
    );
    this.app.use(logger("dev"));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(cookieParser());
    this.app.use(
      fileUpload({
        limits: {
          fileSize: 5 * 1024 * 1024,
        },
      }),
    );
  }

  private routes(): void {
    this.app.get("/", (req, res) => {
      res.send({ message: this.message });
    });

    this.app.use("/api-v1", userRouter);
    this.app.use("/api-v1", settingRouter);
    this.app.use("/api-v1", kategoriRouter);
    this.app.use("/api-v1", barangRouter);
    this.app.use("/api-v1", suplierRouter);
    this.app.use("/api-v1", beliRouter);
    this.app.use("/api-v1", beliDetailRouter);
    this.app.use("/api-v1", returRouter);
    this.app.use("/api-v1", jualRouter);

    this.app.use((req, res, next) => {
      next(createHttpError.NotFound());
    });

    this.app.use(errorHandler);
  }
}

const { app, port, message } = new App();

app.listen(port, () => {
  console.log(message);
});
