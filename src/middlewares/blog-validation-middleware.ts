import { body } from "express-validator";

export const inputNameBlogValidator = () => body('name')
    .exists().withMessage('Error!! Field is not exist')
    .isString().withMessage('Error!! Field should be string')
    .trim().notEmpty().withMessage('Error!! Field shouldn\'t be empty')
    .isLength({ min: 1, max: 15 }).withMessage('Error!! Invalid field length')

export const inputDescriptionBlogValidator = () => body('description')
    .exists().withMessage('Error!! Field is not exist')
    .isString().withMessage('Error!! Field should be string')
    .trim().notEmpty().withMessage('Error!! Field shouldn\'t be empty')
    .isLength({ min: 1, max: 500 }).withMessage('Error!! Invalid field length')

export const inputWebsiteUrlBlogValidator = () => body('websiteUrl')
    .exists().withMessage('Error!! Field is not exist')
    .isString().withMessage('Error!! Field should be string')
    .trim().notEmpty().withMessage('Error!! Field shouldn\'t be empty')
    .isLength({ min: 1, max: 100 }).withMessage('Error!! Invalid field length')
    .isURL().withMessage('Error!! Field filled in incorrectly')







