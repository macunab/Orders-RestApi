import { Application } from "express";
import { CommonRoutesConfig } from "../helpers/CommonRoutesConfig";


export class CustomerRoute extends CommonRoutesConfig {

    constructor(app: Application) {
        super(app, 'CustomerRoute');
    }
    
    configureRoutes(): Application {


        return this.app;
    }

}