"use strict";

var _CarsRepositoyInMemory = require("@modules/cars/repositories/in-memory/CarsRepositoyInMemory");
var _AppError = require("@shared/errors/AppError");
var _CreateCarUseCase = require("./CreateCarUseCase");
let createCarUseCase;
let carsRepositoryInMemory;
describe("Create car", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new _CarsRepositoyInMemory.CarsRepositoryInMemory();
    createCarUseCase = new _CreateCarUseCase.CreateCarUseCase(carsRepositoryInMemory);
  });
  it("should be able to create a new car", async () => {
    const car = await createCarUseCase.execute({
      name: "name car",
      description: "description car",
      daily_rate: 100,
      license_plate: "1234",
      fine_amount: 50,
      brand: "car brand",
      category_id: "categoryfk"
    });
    expect(car).toHaveProperty("id");
  });
  it("should not be able to create a car with exists license_plate", async () => {
    await createCarUseCase.execute({
      name: "Car1",
      description: "description car",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 50,
      brand: "car brand",
      category_id: "categoryfk"
    });
    await expect(createCarUseCase.execute({
      name: "Car2",
      description: "description car",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 50,
      brand: "car brand",
      category_id: "categoryfk"
    })).rejects.toEqual(new _AppError.AppError("Car already exists"));
  });
  it("should be not be able to create a car with available true by default", async () => {
    const car = await createCarUseCase.execute({
      name: "Car available",
      description: "description car",
      daily_rate: 100,
      license_plate: "ABCD-1234",
      fine_amount: 50,
      brand: "car brand",
      category_id: "categoryfk"
    });
    expect(car.available).toBe(true);
  });
});