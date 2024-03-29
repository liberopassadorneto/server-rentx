import { inject, injectable } from "tsyringe";

import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
    id: string;
    user_id: string;
}

@injectable()
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
        const car = await this.carsRepository.findById(rental.car_id);
        const minimumDaily = 1;

        if (!rental) {
            throw new AppError("Rental not found");
        }

        // verificar o tempo de aluguel
        const currentReturnDate = this.dateProvider.dateNow();

        let daily = this.dateProvider.compareInDays(
            currentReturnDate,
            rental.start_date
        );

        // Se o carro for devolvido com menos de 24 horas, deverá ser cobrado uma diária completa.
        if (daily <= 0) {
            daily = minimumDaily;
        }

        const delay = this.dateProvider.compareInDays(
            currentReturnDate,
            rental.expected_return_date
        );

        let total = 0;

        if (delay > 0) {
            const calculateFine = delay * car.fine_amount;
            total = calculateFine;
        }

        total += daily * car.daily_rate;

        rental.end_date = currentReturnDate;
        rental.total = total;

        await this.rentalsRepository.create(rental);
        await this.carsRepository.updateAvailable(car.id, true);

        return rental;
    }
}

export { DevolutionRentalUseCase };
