import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { AppError } from "@shared/errors/AppError";

dayjs.extend(utc);

interface IRequest {
    user_id: string;
    car_id: string;
    expected_return_date: Date;
}

class CreateRentalUseCase {
    constructor(private rentalsRepository: IRentalsRepository) {}

    async execute({
        user_id,
        car_id,
        expected_return_date,
    }: IRequest): Promise<Rental> {
        const minimumHour = 24;

        // Não deve ser possível cadastrar um novo aluguel, caso já exista um aberto para o mesmo carro
        const carUnavailable = await this.rentalsRepository.findOpenRentalByCar(
            car_id
        );

        if (carUnavailable) {
            throw new AppError("Car is already rented");
        }

        // Não deve ser possível cadastrar um novo aluguel, caso já exsta um aberto para o mesmo usuário
        const rentalOpenToUser =
            await this.rentalsRepository.findOpenRentalByUser(user_id);

        if (rentalOpenToUser) {
            throw new AppError("User already has an open rental");
        }

        // O aluguel deve ter duração mínima de 24 horas;
        const expectedReturnDateFormatted = dayjs(expected_return_date)
            .utc()
            .local()
            .format();

        const dateNowFormatted = dayjs().utc().local().format();

        const compare = dayjs(expectedReturnDateFormatted).diff(
            dateNowFormatted,
            "hours"
        );

        if (compare < minimumHour) {
            throw new AppError(
                "Expected return date must be at least 24 hours from now"
            );
        }

        const rental = await this.rentalsRepository.create({
            user_id,
            car_id,
            expected_return_date,
        });

        return rental;
    }
}

export { CreateRentalUseCase };
