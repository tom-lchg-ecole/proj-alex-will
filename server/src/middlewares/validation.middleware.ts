import { NextFunction, Request, Response } from 'express'
import Joi from 'joi'

export const validationMiddleware = (schema: Joi.Schema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body)
    if (error) {
      return res.status(400).json({ success: false, message: error.message, data: null })
    }
    next()
  }
}
