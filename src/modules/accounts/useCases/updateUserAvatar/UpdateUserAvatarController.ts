import { Request, Response } from "express";
import { container } from "tsyringe";

import { UpdateAvatarUseCase } from "./UpdateUserAvataUseCase";

class UpdateUserAvatarController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.user;

        // Receber o arquivo do avatar (file.filename)
        const avatar_file = request.file.filename;

        const updateUserAvatarUseCase = container.resolve(UpdateAvatarUseCase);

        await updateUserAvatarUseCase.execute({ user_id: id, avatar_file });

        return response.status(204).send();
    }
}

export { UpdateUserAvatarController };
