import { Application } from "express";
import { CommonRoutesConfig } from "../helpers/CommonRoutesConfig";
import { check } from "express-validator";
import AuthController from "../controllers/AuthController";
import ValidationFields from "../middlewares/ValidationFields";


export class AuthRoute extends CommonRoutesConfig {

    constructor(app: Application) {
        super(app, 'AuthRoutes');
    }

    configureRoutes(): Application {
        
        this.app.route('/api/login')
            .post(
                check('email', 'The email is required').not().isEmpty(),
                check('password', 'The password is required').not().isEmpty(),
                ValidationFields.verifyErrors,
                AuthController.login
            );

            this.app.route('/api/verify-token')
                .get(
                    AuthController.verifyAndRenewToken
                );
                
        return this.app;
    }
    

}