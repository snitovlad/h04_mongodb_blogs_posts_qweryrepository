import { query } from "express-validator";

export const inputSearchNameTermQueryValidator = () => query('searchNameTerm')
    .optional()
    .trim().notEmpty().withMessage('Error!! Field shouldn\'t be empty')
    .isLength({ min: 1, max: 15 }).withMessage('Error!! Invalid field length')

export const inputSortByQueryValidator = () => query('sortBy')
    .optional()
    .trim().notEmpty().withMessage('Error!! Field shouldn\'t be empty')
    .isLength({ min: 1, max: 100 }).withMessage('Error!! Invalid field length')

export const inputSortDirectionQueryValidator = () => query('sortDirection')
    .optional()
    .trim().notEmpty().withMessage('Error!! Field shouldn\'t be empty')
    .equals('desc' || 'asc').withMessage('Error!! Field should be empty "desc" or "asc')


export const inputPageNumberQueryValidator = () => query('pageNumber')
    .optional()
    .trim().notEmpty().withMessage('Error!! Field shouldn\'t be empty')
    .isInt().withMessage('Error!! Field should be number')
    .isLength({ min: 1, max: 15 }).withMessage('Error!! Invalid field length')

export const inputPageSizeQueryValidator = () => query('pageSize')
    .optional()
    .trim().notEmpty().withMessage('Error!! Field shouldn\'t be empty')
    .isInt().withMessage('Error!! Field should be number')
    .isLength({ min: 1, max: 15 }).withMessage('Error!! Invalid field length')
