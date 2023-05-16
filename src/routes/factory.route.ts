import { Application } from "express";
import { CommonRoutesConfig } from "../helpers/CommonRoutesConfig";


export class FactoryRoute extends CommonRoutesConfig {
    
    constructor(app: Application) {
        super(app, 'FactoryRoute');
    }

    configureRoutes(): Application {

        return this.app;
    }

}