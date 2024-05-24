import { Request, Response } from 'express'
import { deleteAllDataRepository } from './deleteAllData-repository';

export const deleteAllData = (req: Request, res: Response) => {

    try {
        deleteAllDataRepository.deleteAllData()
        res.sendStatus(204)
    } catch (e) {
        res.sendStatus(500)
    }
}
