import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";
import { AppError } from "@shared/errors/AppError";

interface IPayload {
    sub: string;
}

export async function ensureAuthenticated(
    request: Request,
    response: Response,
    next: NextFunction
) {
    // Bearer 319csad1293dkao1 (token)
    const authHeader = request.headers.authorization;

    if (!authHeader) {
        throw new AppError("Token missing from request", 401);
    }

    // fazendo o split de authHeader pelo espaço em branco " "
    // quebro o authHeader e crio/salvo um novo array da seguinte maneira:
    // salvo o Bearer em [0] e o token em [1], isto é
    // [0] = Bearer
    // [1] = 319csad1293dkao1 (token)
    // não preciso do Bearer, então salvo somente o token dentro da variavel token -> [, token]
    const [, token] = authHeader.split(" ");

    try {
        // preciso somente do sub (id do user) da resposta do verify(), por isso, vou fazer uma desestruturação
        const { sub: user_id } = verify(
            token,
            "1ba52fd7af3d6def0211f598c8933a84"
        ) as IPayload;

        // verificar se o sub (id_user) existe no BD
        const usersRepository = new UsersRepository();
        const user = await usersRepository.findById(user_id);

        if (!user) {
            throw new AppError("User does not exists", 401);
        }

        request.user = {
            id: user_id,
        };

        next();
    } catch (err) {
        throw new AppError("Invalid token", 401);
    }
}
