import { NextFunction, Request, Response } from "express"
import { SETTINGS } from "../settings"

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const auth = req.headers['authorization'] as string // 'Basic xxxx'
    //console.log(auth)
    if (!auth) {
        res
            .status(401)
            .json({})
        return
    }

    //если авторизация приходит уже закодированная в utf8, а храним в base64
    // const buff = Buffer.from(auth.slice(6), 'base64')
    // const decodedAuth = buff.toString('utf8')
    // if (decodedAuth !== ADMIN_AUTH || auth.slice(0, 6) !== 'Basic ') {
    //     res
    //         .status(401)
    //         .json({})
    //     return
    // }

    //если авторизация приходит закодированная в base64, а храним в utf8
    const buff2 = Buffer.from(SETTINGS.ADMIN_AUTH, 'utf8')
    const codedAuth = buff2.toString('base64')
    if (auth.slice(6) !== codedAuth || auth.slice(0, 6) !== 'Basic ') {
        res
            .status(401)
            .json({})
        return
    }
    next()
}