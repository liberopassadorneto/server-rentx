"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tsyringe_1 = require("tsyringe");
require("./providers");
var UsersRepository_1 = require("@modules/accounts/infra/typeorm/repositories/UsersRepository");
var UsersTokensRepository_1 = require("@modules/accounts/infra/typeorm/repositories/UsersTokensRepository");
var CarsImagesRepository_1 = require("@modules/cars/infra/typeorm/repositories/CarsImagesRepository");
var CarsRepository_1 = require("@modules/cars/infra/typeorm/repositories/CarsRepository");
var CategoriesRepository_1 = require("@modules/cars/infra/typeorm/repositories/CategoriesRepository");
var SpecificationsRepository_1 = require("@modules/cars/infra/typeorm/repositories/SpecificationsRepository");
var RentalsRepository_1 = require("@modules/rentals/infra/typeorm/repositories/RentalsRepository");
// singleton => criar uma instancia global de uma classe
tsyringe_1.container.registerSingleton("CategoriesRepository", CategoriesRepository_1.CategoriesRepository);
tsyringe_1.container.registerSingleton("SpecificationsRepository", SpecificationsRepository_1.SpecificationsRepository);
tsyringe_1.container.registerSingleton("UsersRepository", UsersRepository_1.UsersRepository);
tsyringe_1.container.registerSingleton("CarsRepository", CarsRepository_1.CarsRepository);
tsyringe_1.container.registerSingleton("CarsImagesRepository", CarsImagesRepository_1.CarsImagesRepository);
tsyringe_1.container.registerSingleton("RentalsRepository", RentalsRepository_1.RentalsRepository);
tsyringe_1.container.registerSingleton("UsersTokensRepository", UsersTokensRepository_1.UsersTokensRepository);
