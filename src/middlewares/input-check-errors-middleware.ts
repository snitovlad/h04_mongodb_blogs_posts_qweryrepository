import { NextFunction, Request, Response } from "express";
import { Result, validationResult } from "express-validator";
import { filterOfFirstErrorInEveryField } from "../helper/helper";

export const inputCheckErrorsMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const e: Result = validationResult(req);
    const errors = e.array()

    const errorsCorrect = filterOfFirstErrorInEveryField(errors)

    if (errors.length) {
        res.status(400).json({ errorsMessages: errorsCorrect.map(e => ({ message: e.msg, field: e.path })) })
        return
    }
    next()
}