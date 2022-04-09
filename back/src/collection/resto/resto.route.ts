import { Router } from "express";
import { restoController } from "./resto.controller";

class RestoRoute {
  router: Router;

  constructor() {
    this.router = Router();
  }

  private init() {
    this.router
      .route("/")
      .get(restoController.getAll.bind(restoController))
      .post(restoController.create.bind(restoController));
    this.router
      .route("/:restoId")
      .get(restoController.getById.bind(restoController))
      .put(restoController.update.bind(restoController))
      .delete(restoController.delete.bind(restoController));
  }
}
