"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppError = void 0;
var AppError = /** @class */ (function () {
    // se não tiver nenhum statusCode, o valor default é 400
    function AppError(message, statusCode) {
        if (statusCode === void 0) { statusCode = 400; }
        this.message = message;
        this.statusCode = statusCode;
    }
    return AppError;
}());
exports.AppError = AppError;
