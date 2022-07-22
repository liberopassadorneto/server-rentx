import dayjs from "dayjs";

import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateRentalUseCase } from "./CreateRentalUseCase";

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;

describe("Create Rental", () => {
    const dayAdd24Hours = dayjs().add(24, "hours").toDate();

    beforeEach(() => {
        rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
        createRentalUseCase = new CreateRentalUseCase(
            rentalsRepositoryInMemory
        );
    });

    it("should create a new rental", async () => {
        const rental = await createRentalUseCase.execute({
            user_id: "Libero",
            car_id: "AudiTT",
            expected_return_date: dayAdd24Hours,
        });

        expect(rental).toHaveProperty("id");
        expect(rental).toHaveProperty("start_date");
    });

    it("should not create a new rental if user already has an open rental ", async () => {
        expect(async () => {
            await createRentalUseCase.execute({
                user_id: "Libero",
                car_id: "Mustang",
                expected_return_date: dayAdd24Hours,
            });

            await createRentalUseCase.execute({
                user_id: "Libero",
                car_id: "Lamborghini",
                expected_return_date: dayAdd24Hours,
            });
        }).rejects.toBeInstanceOf(AppError);
    });

    it("should not create a new rental if car is already rented", async () => {
        expect(async () => {
            await createRentalUseCase.execute({
                user_id: "Libero",
                car_id: "AudiR8",
                expected_return_date: dayAdd24Hours,
            });

            await createRentalUseCase.execute({
                user_id: "Marcelo",
                car_id: "AudiR8",
                expected_return_date: dayAdd24Hours,
            });
        }).rejects.toBeInstanceOf(AppError);
    });

    it("should not create a new rental if expected return date is less than 24 hours from now", async () => {
        expect(async () => {
            await createRentalUseCase.execute({
                user_id: "Libero",
                car_id: "AudiTT",
                expected_return_date: dayjs().toDate(),
            });
        }).rejects.toBeInstanceOf(AppError);
    });
});
