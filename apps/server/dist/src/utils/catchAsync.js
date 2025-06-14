"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = catchAsync;
function catchAsync(fn) {
    return (req, res, next) => {
        fn(req, res, next).catch(next);
    };
}
