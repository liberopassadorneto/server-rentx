"use strict";

var _CarsRepositoyInMemory = require("@modules/cars/repositories/in-memory/CarsRepositoyInMemory");
var _ListAvailableCarsUseCase = require("./ListAvailableCarsUseCase");
let listAvailableCarsUseCase;
let carsRepositoryInMemory;
describe("List Cars", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new _CarsRepositoyInMemory.CarsRepositoryInMemory();
    listAvailableCarsUseCase = new _ListAvailableCarsUseCase.ListAvailableCarsUseCase(carsRepositoryInMemory);
  });
  it("should be able to list all available", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car1",
      description: "Car1_description",
      daily_rate: 100,
      license_plate: "Car1-1234",
      fine_amount: 80,
      brand: "Car1_brand",
      category_id: "Car1_category"
    });
    const cars = await listAvailableCarsUseCase.execute({});
    expect(cars).toEqual([car]);
  });
  it("should be able to list all available cars by category_id", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car2",
      description: "Car2_description",
      daily_rate: 100,
      license_plate: "Car2-1234",
      fine_amount: 80,
      brand: "Car2_brand",
      category_id: "Car2_category"
    });
    const cars = await listAvailableCarsUseCase.execute({
      category_id: "Car2_category"
    });
    expect(cars).toEqual([car]);
  });
  it("should be able to list all available cars by brand", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car3",
      description: "Car3_description",
      daily_rate: 100,
      license_plate: "Car3-1234",
      fine_amount: 80,
      brand: "Car3_brand",
      category_id: "Car3_category"
    });
    const cars = await listAvailableCarsUseCase.execute({
      brand: "Car3_brand"
    });
    expect(cars).toEqual([car]);
  });
  it("should be able to list all available cars by name", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car4_name",
      description: "Car4_description",
      daily_rate: 100,
      license_plate: "Car4-1234",
      fine_amount: 80,
      brand: "Car4_brand",
      category_id: "Car4_category"
    });
    const cars = await listAvailableCarsUseCase.execute({
      name: "Car4_name"
    });
    expect(cars).toEqual([car]);
  });
});