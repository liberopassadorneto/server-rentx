import { inject, injectable } from "tsyringe";

import { deleteFile } from "../../../../utils/file";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
    user_id: string;
    avatar_file: string;
}

@injectable()
class UpdateAvatarUseCase {
    // Adicionar coluna avatar na tabela de users
    // Refator o usuário com coluna avatar
    // Configuração upload multer
    // Criar a regra de negócio do upload
    // Criar Controller

    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ) {}

    async execute({ user_id, avatar_file }: IRequest): Promise<void> {
        const user = await this.usersRepository.findById(user_id);

        // se já existir um avatar, deletar o arquivo antigo antes de salvar um novo
        if (user.avatar) {
            await deleteFile(`./tmp/avatar/${user.avatar}`);
        }

        user.avatar = avatar_file;

        await this.usersRepository.create(user);
    }
}

export { UpdateAvatarUseCase };
