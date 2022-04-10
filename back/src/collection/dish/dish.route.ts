import { Router } from "express";
import * as passport from "passport";
import { dishController } from "./dish.controller";

class DishRoute {
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
        dishController.getAll.bind(dishController)
      )
      .post(
        passport.authenticate("jwt", { session: false }),
        dishController.create.bind(dishController)
      );
    this.router
      .route("/:dishId")
      .get(
        passport.authenticate("jwt", { session: false }),
        dishController.getById.bind(dishController)
      )
      .put(
        passport.authenticate("jwt", { session: false }),
        dishController.update.bind(dishController)
      )
      .delete(
        passport.authenticate("jwt", { session: false }),
        dishController.delete.bind(dishController)
      );
  }
}

export const dishRoutes = new DishRoute().router;
