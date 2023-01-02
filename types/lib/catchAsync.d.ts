export = catchAsync;
/**
 *
 * @param {Function} fn
 * @returns {(fn: Function) => (req: import("express").Request, res: import("express").Response, next: import("express").NextFunction) => void}
 */
declare function catchAsync(fn: Function): (fn: Function) => (req: any, res: any, next: any) => void;
//# sourceMappingURL=catchAsync.d.ts.map