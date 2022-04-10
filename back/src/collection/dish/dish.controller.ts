import { NextFunction, Request, Response } from "express";
import { ControllerRead } from "../../common/controller/controller-read.interface";
import { ControllerWrite } from "../../common/controller/controller-write.interface";
import { wrapToSendBackResponse } from "../../common/wrap-to-send-back-response";
import { DishType } from "./dish.interface";
import { dishService } from "./dish.service";

class DishController implements ControllerRead, ControllerWrite {
  create(req: Request, res: Response, next: NextFunction): void {
    wrapToSendBackResponse<DishType[] | null>(dishService.getAll(), res, next);
  }

  delete(req: Request, res: Response, next: NextFunction): void {
    wrapToSendBackResponse<boolean>(
      dishService.delete(req.params.dishId),
      res,
      next
    );
  }

  update(req: Request, res: Response, next: NextFunction): void {
    wrapToSendBackResponse<DishType | null>(
      dishService.update(req.body),
      res,
      next
    );
  }

  getAll(req: Request, res: Response, next: NextFunction): void {
    wrapToSendBackResponse<DishType[] | null>(dishService.getAll(), res, next);
  }

  getById(req: Request, res: Response, next: NextFunction): void {
    wrapToSendBackResponse<DishType | null>(
      dishService.getById(req.params.dishId),
      res,
      next
    );
  }
}

export const dishController = new DishController();
