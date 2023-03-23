export = MediaParser;
declare class MediaParser {
    /**
     *
     * @param { { name: string, fileExtensions?: string[], storage?:object, maxSize?:number }} options
     */
    constructor(options: {
        name: string;
        fileExtensions?: string[];
        storage?: object;
        maxSize?: number;
    });
    name: string;
    maxSize: number;
    fileExtensions: string[];
    storage: any;
    /**
     *
     * @param {*} req
     * @param {*} file
     * @param {*} callback
     */
    fileFilter(req: any, file: any, callback: any): void;
    singleUpload: import("express").RequestHandler<import("express-serve-static-core").ParamsDictionary, any, any, qs.ParsedQs, Record<string, any>>;
    arrayUpload: import("express").RequestHandler<import("express-serve-static-core").ParamsDictionary, any, any, qs.ParsedQs, Record<string, any>>;
}
//# sourceMappingURL=mediaParser.d.ts.map