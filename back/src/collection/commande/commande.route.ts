import { Router } from "express";
import * as passport from "passport";
import { commandeController } from "./commande.controller";

class CommandeRoute {
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
        commandeController.getAll.bind(commandeController)
      )
      .post(
        passport.authenticate("jwt", { session: false }),
        commandeController.create.bind(commandeController)
      );
    this.router
      .route("/:commandeId")
      .get(
        passport.authenticate("jwt", { session: false }),
        commandeController.getById.bind(commandeController)
      )
      .put(
        passport.authenticate("jwt", { session: false }),
        commandeController.update.bind(commandeController)
      )
      .delete(
        passport.authenticate("jwt", { session: false }),
        commandeController.delete.bind(commandeController)
      );
  }
}
const commandeRoute = new CommandeRoute();
export const commandeRoutes = commandeRoute.router;
