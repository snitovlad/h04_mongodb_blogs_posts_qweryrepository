import { param } from "express-validator";

export const inputIdValidator = () => param('id')
    .isMongoId().withMessage('Error!! Invalid id')
