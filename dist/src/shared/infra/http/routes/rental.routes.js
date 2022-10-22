"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rentalRoutes = void 0;
var express_1 = require("express");
var CreateRentalController_1 = require("@modules/rentals/useCases/createRental/CreateRentalController");
var DevolutionRentalController_1 = require("@modules/rentals/useCases/devolutionRental/DevolutionRentalController");
var ListRentalsByUserController_1 = require("@modules/rentals/useCases/listRentalsByUser/ListRentalsByUserController");
var ensureAuthenticated_1 = require("../middlewares/ensureAuthenticated");
var rentalRoutes = (0, express_1.Router)();
exports.rentalRoutes = rentalRoutes;
var createRentalController = new CreateRentalController_1.CreateRentalController();
var devolutionRentalController = new DevolutionRentalController_1.DevolutionRentalController();
var listRentalsByUserController = new ListRentalsByUserController_1.ListRentalsByUserController();
rentalRoutes.post("/", ensureAuthenticated_1.ensureAuthenticated, createRentalController.handle);
rentalRoutes.post("/devolution/:id", ensureAuthenticated_1.ensureAuthenticated, devolutionRentalController.handle);
rentalRoutes.get("/user", ensureAuthenticated_1.ensureAuthenticated, listRentalsByUserController.handle);
