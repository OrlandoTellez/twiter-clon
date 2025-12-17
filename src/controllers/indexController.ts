import { Request, Response } from "express"

export const getIndex = (req: Request, res: Response) => res.render("index")
export const getNotificaciones = (req: Request, res: Response) => res.render("notificaciones")
export const getExplore = (req: Request, res: Response) => res.render("explore")