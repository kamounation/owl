/// <reference types="node" />
export = Dolph;
declare class Dolph {
    /**
     *
     * @param {Array<{path?: string; router:  import("express").Router}>} routes
     * @param {string|number} port
     * @param {string|number} env
     * @param {{url:string, options:Object}} mongodbConfig
     * @param {Array<any>} externalMiddlewares
     */
    constructor(routes: Array<{
        path?: string;
        router: import("express").Router;
    }>, port: string | number, env: string | number, mongodbConfig: {
        url: string;
        options: any;
    }, externalMiddlewares: Array<any>);
    app: import("express-serve-static-core").Express;
    env: string | number;
    port: string | number;
    /**
     * @returns {Server<typeof IncomingMessage, typeof ServerResponse>}
     * function returns the dolphjs server which
     * can be used for websocket connections
     */
    listen(): Server<typeof IncomingMessage, typeof ServerResponse>;
    /**
     *
     * @returns {express.Express}
     * exposes the express application
     */
    server(): express.Express;
    /**
     *
     * @param {Array<any>} middlewares
     * property adds middlewares to the `express application`
     */
    initExternalMiddleWares(middlewares: Array<any>): void;
    #private;
}
declare namespace Dolph {
    export { pick, catchAsync, logger, Router, httpStatus, AppRes, Ip, mediaParser, mongoose };
}
import { Server } from "http";
import { IncomingMessage } from "http";
import { ServerResponse } from "http";
import express = require("express");
import { pick } from "../utils/pick";
import catchAsync = require("./catchAsync");
import logger = require("../config/logger");
declare const Router: typeof express.Router;
import httpStatus = require("http-status");
import AppRes = require("./appRes");
import { Ip } from "./Ip";
import mediaParser = require("./mediaParser");
import { default as mongoose } from "mongoose";
//# sourceMappingURL=Dolph.d.ts.map