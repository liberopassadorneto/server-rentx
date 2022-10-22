"use strict";

var _dayjs = _interopRequireDefault(require("dayjs"));
var _CarsRepositoyInMemory = require("@modules/cars/repositories/in-memory/CarsRepositoyInMemory");
var _RentalsRepositoryInMemory = require("@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory");
var _DayJsDateProvider = require("@shared/container/providers/DateProvider/implementations/DayJsDateProvider");
var _AppError = require("@shared/errors/AppError");
var _CreateRentalUseCase = require("./CreateRentalUseCase");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
let createRentalUseCase;
let rentalsRepositoryInMemory;
let carsRepositoryInMemory;
let dayJsDateProvider;
describe("Create Rental", () => {
  const dayAdd24Hours = (0, _dayjs.default)().add(24, "hours").toDate();
  beforeEach(() => {
    rentalsRepositoryInMemory = new _RentalsRepositoryInMemory.RentalsRepositoryInMemory();
    carsRepositoryInMemory = new _CarsRepositoyInMemory.CarsRepositoryInMemory();
    dayJsDateProvider = new _DayJsDateProvider.DayJsDateProvider();
    createRentalUseCase = new _CreateRentalUseCase.CreateRentalUseCase(rentalsRepositoryInMemory, dayJsDateProvider, carsRepositoryInMemory);
  });
  it("should create a new rental", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Test",
      description: "Car Test",
      daily_rate: 100,
      license_plate: "test",
      fine_amount: 40,
      category_id: "1234",
      brand: "brand"
    });
    const rental = await createRentalUseCase.execute({
      user_id: "12345",
      car_id: car.id,
      expected_return_date: dayAdd24Hours
    });
    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");
  });
  it("should not create a new rental if user already has an open rental", async () => {
    await rentalsRepositoryInMemory.create({
      user_id: "1234",
      car_id: "0001",
      expected_return_date: dayAdd24Hours
    });
    await expect(createRentalUseCase.execute({
      user_id: "1234",
      car_id: "9999",
      expected_return_date: dayAdd24Hours
    })).rejects.toEqual(new _AppError.AppError("User already has an open rental"));
  });
  it("should not create a new rental if car is already rented", async () => {
    await rentalsRepositoryInMemory.create({
      user_id: "123",
      car_id: "test",
      expected_return_date: dayAdd24Hours
    });
    await expect(createRentalUseCase.execute({
      user_id: "321",
      car_id: "test",
      expected_return_date: dayAdd24Hours
    })).rejects.toEqual(new _AppError.AppError("Car is already rented"));
  });
  it("should not create a new rental if expected return date is less than 24 hours from now", async () => {
    await expect(createRentalUseCase.execute({
      user_id: "123",
      car_id: "test",
      expected_return_date: (0, _dayjs.default)().toDate()
    })).rejects.toEqual(new _AppError.AppError("Expected return date must be at least 24 hours from now"));
  });
});