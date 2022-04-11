import { Router } from "express";
import { userController } from "./user.controller";

class UserRouter {
  router: Router;

  constructor() {
    this.router = Router();
    this.init();
  }

  private init() {
    this.router.route("/").get(userController.getAll.bind(userController));
    this.router
      .route("/profile/:userId")
      .put(userController.update.bind(userController));
    this.router
      .route("/:userId")
      .get(userController.getById.bind(userController))
      .put(userController.update.bind(userController))
      .delete(userController.delete.bind(userController));
    this.router
      .route("/signup")
      .post(userController.signUp.bind(userController));
    this.router.route("/login").post(userController.login.bind(userController));
  }
}

const userRouter = new UserRouter();

export const userRoutes = userRouter.router;
