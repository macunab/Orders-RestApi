import { Application } from "express";
import { CommonRoutesConfig } from "../helpers/CommonRoutesConfig";


export class TransportRoute extends CommonRoutesConfig {
    
    constructor(app: Application) {
        super(app, 'TransportRoutes');
    }
    configureRoutes(): Application {
        
        return this.app;
    }

}