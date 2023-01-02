/// <reference types="node" />
export = OwlFactory;
declare class OwlFactory {
    /**
     *
     * @param {Array<{path?: string; router: Router}>} routes
     * @param {string|number} port
     * @param {string|number} env
     */
    constructor(routes: Array<{
        path?: string;
        router: Router;
    }>, port: string | number, env: string | number);
    app: any;
    env: string | number;
    port: string | number;
    /**
     *
     * @returns {Server<typeof IncomingMessage, typeof ServerResponse>}
     */
    listen(): Server<typeof IncomingMessage, typeof ServerResponse>;
    /**
     *
     * @returns {express.Express}
     */
    server(): express.Express;
    /**
     *
     * @param {Array<{path?: string; router: Router}>}  routes
     */
    initalizeRoutes(routes: Array<{
        path?: string;
        router: Router;
    }>): void;
    initalizeMiddleWares(): void;
    initializeNotFoundHandler(): void;
    initializeConfig(env: any): void;
    initializeErrorHandlers(): void;
    exitHandler(): void;
    unexpectedErrorHandler: (error: any) => void;
    initClosureHandler(): void;
}
declare namespace OwlFactory {
    export { catchAsync, logger, unknown as Router, httpStatus, AppRes };
}
import { Server } from "http";
import { IncomingMessage } from "http";
import { ServerResponse } from "http";
import catchAsync = require("./catchAsync");
import logger = require("../config/logger");
import httpStatus = require("http-status");
import AppRes = require("./appRes");
//# sourceMappingURL=OwlFactory.d.ts.map