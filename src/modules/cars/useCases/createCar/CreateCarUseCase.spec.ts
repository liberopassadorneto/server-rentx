import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoyInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateCarUseCase } from "./CreateCarUseCase";

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("Create car", () => {
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
    });

    it("should be able to create a new car", async () => {
        const car = await createCarUseCase.execute({
            name: "name car",
            description: "description car",
            daily_rate: 100,
            license_plate: "1234",
            fine_amount: 50,
            brand: "car brand",
            category_id: "categoryfk",
        });
        expect(car).toHaveProperty("id");
    });

    it("shoulde not be able to create a car with exists licence_plate", async () => {
        expect(async () => {
            await createCarUseCase.execute({
                name: "Car1",
                description: "description car",
                daily_rate: 100,
                license_plate: "ABC-1234",
                fine_amount: 50,
                brand: "car brand",
                category_id: "categoryfk",
            });

            await createCarUseCase.execute({
                name: "Car2",
                description: "description car",
                daily_rate: 100,
                license_plate: "ABC-1234",
                fine_amount: 50,
                brand: "car brand",
                category_id: "categoryfk",
            });
        }).rejects.toBeInstanceOf(AppError);
    });

    it("shoulde not be able to create a car with avaible true by default", async () => {
        const car = await createCarUseCase.execute({
            name: "Car available",
            description: "description car",
            daily_rate: 100,
            license_plate: "ABCD-1234",
            fine_amount: 50,
            brand: "car brand",
            category_id: "categoryfk",
        });
        expect(car.available).toBe(true);
    });
});
