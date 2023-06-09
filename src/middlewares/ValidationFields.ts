import { NextFunction, Request, Response } from "express";
import { validationResult } from 'express-validator';

class ValidationFields {

    verifyErrors(req: Request, res: Response, next: NextFunction) {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({
                ok: false,
                msg: errors.array()
            })
        }
        next();
    }
}

export default new ValidationFields();