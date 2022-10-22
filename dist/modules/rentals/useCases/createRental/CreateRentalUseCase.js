"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateRentalUseCase = void 0;
var _tsyringe = require("tsyringe");
var _ICarsRepository = require("@modules/cars/repositories/ICarsRepository");
var _IRentalsRepository = require("@modules/rentals/repositories/IRentalsRepository");
var _IDateProvider = require("@shared/container/providers/DateProvider/IDateProvider");
var _AppError = require("@shared/errors/AppError");
var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class;
let CreateRentalUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)("RentalsRepository")(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)("DayJsDateProvider")(target, undefined, 1);
}, _dec4 = function (target, key) {
  return (0, _tsyringe.inject)("CarsRepository")(target, undefined, 2);
}, _dec5 = Reflect.metadata("design:type", Function), _dec6 = Reflect.metadata("design:paramtypes", [typeof _IRentalsRepository.IRentalsRepository === "undefined" ? Object : _IRentalsRepository.IRentalsRepository, typeof _IDateProvider.IDateProvider === "undefined" ? Object : _IDateProvider.IDateProvider, typeof _ICarsRepository.ICarsRepository === "undefined" ? Object : _ICarsRepository.ICarsRepository]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = _dec6(_class = class CreateRentalUseCase {
  constructor(rentalsRepository, dateProvider, carsRepository) {
    this.rentalsRepository = rentalsRepository;
    this.dateProvider = dateProvider;
    this.carsRepository = carsRepository;
  }
  async execute({
    user_id,
    car_id,
    expected_return_date
  }) {
    const minimumHour = 24;

    // Não deve ser possível cadastrar um novo aluguel, caso já exista um aberto para o mesmo carro
    const carUnavailable = await this.rentalsRepository.findOpenRentalByCar(car_id);
    if (carUnavailable) {
      throw new _AppError.AppError("Car is already rented");
    }

    // Não deve ser possível cadastrar um novo aluguel, caso já exsta um aberto para o mesmo usuário
    const rentalOpenToUser = await this.rentalsRepository.findOpenRentalByUser(user_id);
    if (rentalOpenToUser) {
      throw new _AppError.AppError("User already has an open rental");
    }

    // O aluguel deve ter duração mínima de 24 horas;
    const dateNow = this.dateProvider.dateNow();
    const compare = this.dateProvider.compareInHours(expected_return_date, dateNow);
    if (compare < minimumHour) {
      throw new _AppError.AppError("Expected return date must be at least 24 hours from now");
    }

    // if everything is ok, create a new rental
    const rental = await this.rentalsRepository.create({
      user_id,
      car_id,
      expected_return_date
    });
    await this.carsRepository.updateAvailable(car_id, false);
    return rental;
  }
}) || _class) || _class) || _class) || _class) || _class) || _class);
exports.CreateRentalUseCase = CreateRentalUseCase;