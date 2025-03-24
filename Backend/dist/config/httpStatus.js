"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpStatus = void 0;
var HttpStatus;
(function (HttpStatus) {
    HttpStatus[HttpStatus["SUCCESS"] = 200] = "SUCCESS";
    HttpStatus[HttpStatus["INVALID_INPUT"] = 411] = "INVALID_INPUT";
    HttpStatus[HttpStatus["USER_EXISTS"] = 403] = "USER_EXISTS";
    HttpStatus[HttpStatus["SERVER_ERROR"] = 500] = "SERVER_ERROR";
    HttpStatus[HttpStatus["WRONG_CREDENTIALS"] = 403] = "WRONG_CREDENTIALS";
    HttpStatus[HttpStatus["USER_NOT_FOUND"] = 404] = "USER_NOT_FOUND";
    HttpStatus[HttpStatus["CONTENT_NOT_FOUND"] = 404] = "CONTENT_NOT_FOUND";
    HttpStatus[HttpStatus["INVALID_ACCESS"] = 403] = "INVALID_ACCESS";
})(HttpStatus || (exports.HttpStatus = HttpStatus = {}));
