import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import userModel from '../models/user.model';
import JwtHelper from '../helpers/JwtHelper';
import { Payload } from '../interfaces/payload.interface';


class AuthController {

    async login(req: Request, res: Response) {

        const { email, password } = req.body;
        
        try {
            const user = await userModel.findOne({email, isEnabled: true});
            if(!user) {
                return res.status(400).json({
                    ok: false,
                    msg: 'The credentials do not correspond to an existing user'
                });
            }
            const isPasswordValid = bcrypt.compareSync(password, user.password);
            if(!isPasswordValid) {
                return res.status(400).json({
                    ok: false,
                    msg: 'The credentials do not correspond to an existing user'
                });
            }
            const token = await JwtHelper.jwtSign(user);
            res.status(200).json({
                ok: true,
                token,
                data: user,
                msg: 'user authenticate successfully'
            });

        } catch(error) {
            return res.status(400).json({
                ok: false,
                msg: `An error ocurred while trying to login, ERROR: ${error}`
            });
        }
    }

    async verifyAndRenewToken(req: Request, res: Response) {
        const headerToken = req.header('x-token');
        if(!headerToken) {
            return res.status(400).json({
                ok: false,
                msg: 'the token was not found'
            });
        }
        try {
            const { user } = jwt.verify(headerToken, (process.env.JWT_SECRET as string)) as Payload;
            console.table(user);
            const token = await JwtHelper.jwtSign(user);
            res.status(200).json({
                ok: true,
                token,
                data: user,
                msg: 'the token is valid and was renewed'
            });
        } catch(error) {
            res.status(400).json({
                ok: false,
                msg: 'the token expired'
            });
        }
    }

}

export default new AuthController();