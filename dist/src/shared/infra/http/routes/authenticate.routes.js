"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateRoutes = void 0;
var express_1 = require("express");
var AuthenticateUserController_1 = require("@modules/accounts/useCases/authenticateUser/AuthenticateUserController");
var RefreshTokenController_1 = require("@modules/accounts/useCases/refreshToken/RefreshTokenController");
var authenticateRoutes = (0, express_1.Router)();
exports.authenticateRoutes = authenticateRoutes;
var authenticateUserController = new AuthenticateUserController_1.AuthenticateUserController();
var refreshTokenController = new RefreshTokenController_1.RefreshTokenController();
authenticateRoutes.post("/sessions", authenticateUserController.handle);
authenticateRoutes.post("/refresh-token", refreshTokenController.handle);
