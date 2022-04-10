import { NextFunction, Request, Response } from "express";
import { ControllerRead } from "../../common/controller/controller-read.interface";
import { ControllerWrite } from "../../common/controller/controller-write.interface";
import { wrapToSendBackResponse } from "../../common/wrap-to-send-back-response";
import { Commande } from "./commande.interface";
import { commandeService } from "./commande.service";

class CommandeController implements ControllerRead, ControllerWrite {
  create(req: Request, res: Response, next: NextFunction): void {
    wrapToSendBackResponse<Commande>(
      commandeService.create(req.body),
      res,
      next
    );
  }

  delete(req: Request, res: Response, next: NextFunction): void {
    wrapToSendBackResponse<boolean>(
      commandeService.delete(req.params.commandeId),
      res,
      next
    );
  }

  update(req: Request, res: Response, next: NextFunction): void {
    wrapToSendBackResponse<Commande | null>(
      commandeService.update(req.body),
      res,
      next
    );
  }

  getAll(req: Request, res: Response, next: NextFunction): void {
    wrapToSendBackResponse<Commande[] | null>(
      commandeService.getAll(),
      res,
      next
    );
  }

  getById(req: Request, res: Response, next: NextFunction): void {
    wrapToSendBackResponse<Commande | null>(
      commandeService.getById(req.params.commandeId),
      res,
      next
    );
  }
}

export const commandeController = new CommandeController();
