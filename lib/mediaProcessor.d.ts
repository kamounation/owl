export = MediaProcessor;
declare class MediaProcessor {
    /**
     *
     * @param {multer.DiskStorageOptions} storageOptions
     * @param {Array<string>} fileExtensions
     */
    constructor(storageOptions: multer.DiskStorageOptions, fileExtensions: Array<string>);
    storageOptions: multer.DiskStorageOptions;
    fileExtensions: string[];
    storage: multer.StorageEngine;
    /**
     *
     * @param {*} req
     * @param {*} file
     * @param {*} callback
     */
    fileFilter(req: any, file: any, callback: any): void;
    /**
     *
     * @param {string} name
     */
    singleUpload(name: string): void;
    /**
     *
     * @param {string} name
     * @param {number} maxSize
     */
    arrayUpload(name: string, maxSize: number): void;
}
import multer = require("multer");
//# sourceMappingURL=mediaProcessor.d.ts.map