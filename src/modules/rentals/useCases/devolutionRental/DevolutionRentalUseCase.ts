import { inject } from "tsyringe";

import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
    id: string;
    user_id: string;
}

class DevolutionRentalUseCase {
    constructor(
        @inject("RentalsRepository")
        private rentalsRepository: IRentalsRepository,
        @inject("CarsRepository")
        private carsRepository: ICarsRepository,
        @inject("DayJsDateProvider")
        private dateProvider: IDateProvider
    ) {}

    async execute({ id, user_id }: IRequest): Promise<Rental> {
        const rental = await this.rentalsRepository.findById(id);
        const car = await this.carsRepository.findById(id);
        const minimumDaily = 1;

        if (!rental) {
            throw new AppError("Rental not found");
        }

        // verificar o tempo de aluguel
        const dateNow = this.dateProvider.dateNow();

        let daily = this.dateProvider.compareInDays(dateNow, rental.start_date);

        // Se o carro for devolvido com menos de 24 horas, deverá ser cobrado uma diária completa.
        if (daily <= 0) {
            daily = minimumDaily;
        }

        const delay = this.dateProvider.compareInDays(
            rental.expected_return_date,
            dateNow
        );

        let total = 0;

        if (delay > 0) {
            const calculateFine = delay * car.fine_amount;
            total = calculateFine;
        }

        total += daily * car.daily_rate;

        rental.end_date = this.dateProvider.dateNow();
        rental.total = total;

        await this.rentalsRepository.create(rental);
        await this.carsRepository.updateAvailable(car.id, true);

        return rental;
    }
}

export { DevolutionRentalUseCase };
