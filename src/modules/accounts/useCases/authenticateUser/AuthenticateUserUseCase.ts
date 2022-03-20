import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
    email: string;
    password: string;
}

interface IResponse {
    user: {
        name: string;
        email: string;
    };
    token: string;
}

@injectable()
class AuthenticateUserUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ) {}

    async execute({ email, password }: IRequest): Promise<IResponse> {
        // usuario existe?
        const user = await this.usersRepository.findByEmail(email);

        if (!user) {
            throw new AppError("Email or password incorrect");
        }

        // senha está correta?
        const isPasswordMatch = await compare(password, user.password);

        if (!isPasswordMatch) {
            throw new AppError("Email or password incorrect");
        }

        // gerar jsonwebtoken
        const token = sign({}, "1ba52fd7af3d6def0211f598c8933a84", {
            subject: user.id,
            expiresIn: "1d",
        });

        const tokenReturn: IResponse = {
            token,
            user: { name: user.name, email: user.email },
        };

        return tokenReturn;
    }
}

export { AuthenticateUserUseCase };
