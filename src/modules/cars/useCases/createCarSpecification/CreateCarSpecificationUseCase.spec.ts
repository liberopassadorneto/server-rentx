import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoyInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase";

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("Create Car Specification", () => {
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
            carsRepositoryInMemory
        );
    });

    it("should not be able to add a new specification to none-existent car", async () => {
        expect(async () => {
            const car_id = "1234";
            const specifications_id = ["54321"];
            await createCarSpecificationUseCase.execute({
                car_id,
                specifications_id,
            });
        }).rejects.toBeInstanceOf(AppError);
    });
    it("should be able to add a new specification to the car", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Car1",
            description: "description car",
            daily_rate: 100,
            license_plate: "ABC-1234",
            fine_amount: 50,
            brand: "car brand",
            category_id: "categoryfk",
        });

        const specifications_id = ["54321"];

        await createCarSpecificationUseCase.execute({
            car_id: car.id,
            specifications_id,
        });
    });
});
