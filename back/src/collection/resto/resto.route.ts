import { Router } from "express";
import passport from "../../app/app.authentication";
import { restoController } from "./resto.controller";

class RestoRoute {
  router: Router;

  constructor() {
    this.router = Router();
    this.init();
  }

  private init() {
    this.router
      .route("/")
      .get(
        passport.authenticate("jwt", { session: false }),
        restoController.getAll.bind(restoController)
      )
      .post(
        passport.authenticate("jwt", { session: false }),
        restoController.create.bind(restoController)
      );
    this.router
      .route("/:restoId")
      .get(
        passport.authenticate("jwt", { session: false }),
        restoController.getById.bind(restoController)
      )
      .put(
        passport.authenticate("jwt", { session: false }),
        restoController.update.bind(restoController)
      )
      .delete(
        passport.authenticate("jwt", { session: false }),
        restoController.delete.bind(restoController)
      );
  }
}
const restoRoute = new RestoRoute();

export const restoRoutes = restoRoute.router;
