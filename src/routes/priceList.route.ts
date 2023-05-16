import { Application } from "express";
import { CommonRoutesConfig } from "../helpers/CommonRoutesConfig";


export class PriceListRoute extends CommonRoutesConfig {
    
    constructor(app: Application) {
        super(app, 'PriceListRoute');
    }

    configureRoutes(): Application {

        return this.app;
    }

}