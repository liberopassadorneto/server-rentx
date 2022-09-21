import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IStorageProvider } from "@shared/container/providers/StorageProvider/IStorageProvider";

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
        private usersRepository: IUsersRepository,
        @inject("StorageProvider")
        private storageProvider: IStorageProvider
    ) {}

    async execute({ user_id, avatar_file }: IRequest): Promise<void> {
        const user = await this.usersRepository.findById(user_id);

        // se já existir um avatar, deletar o arquivo antigo antes de salvar um novo
        if (user.avatar) {
            await this.storageProvider.delete(user.avatar, "avatar");
        }

        await this.storageProvider.save(avatar_file, "avatar");

        user.avatar = avatar_file;

        await this.usersRepository.create(user);
    }
}

export { UpdateAvatarUseCase };
