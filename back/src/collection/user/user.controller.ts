import { NextFunction, Request, Response } from "express";
import { ControllerRead } from "../../common/controller-read.interface";
import { ControllerWrite } from "../../common/controller-write.interface";
import { wrapToSendBackResponse } from "../../common/wrap-to-send-back-response";
import { AuthenticationResponse, User } from "./user.interface";
import { userService } from "./user.service";

class UserController implements ControllerRead, ControllerWrite {
  create(req: Request, res: Response, next: NextFunction): void {
    wrapToSendBackResponse<User>(userService.create(req.body), res, next);
  }

  delete(req: Request, res: Response, next: NextFunction): void {
    wrapToSendBackResponse<boolean>(
      userService.delete(req.params.userId),
      res,
      next
    );
  }

  update(req: Request, res: Response, next: NextFunction): void {
    wrapToSendBackResponse<User | null>(
      userService.update(req.body),
      res,
      next
    );
  }

  getAll(req: Request, res: Response, next: NextFunction): void {
    wrapToSendBackResponse<User[] | null>(userService.getAll(), res, next);
  }

  getById(req: Request, res: Response, next: NextFunction): void {
    wrapToSendBackResponse<User | null>(
      userService.getById(req.params.userId),
      res,
      next
    );
  }
}
export const userController = new UserController();
