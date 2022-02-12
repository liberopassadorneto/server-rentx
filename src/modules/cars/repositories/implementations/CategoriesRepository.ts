import { getRepository, Repository } from "typeorm";

import { Category } from "../../entities/Category";
import {
    ICategoriesRepository,
    ICreateCategoryDTO,
} from "../ICategoriesRepository";

class CategoriesRepository implements ICategoriesRepository {
    private repository: Repository<Category>;

    // singleton => criar uma instancia global de uma classe
    // private static INSTANCE: CategoriesRepository;

    constructor() {
        this.repository = getRepository(Category);
    }

    // public static getInstance(): CategoriesRepository {
    //     if (!CategoriesRepository.INSTANCE) {
    //         CategoriesRepository.INSTANCE = new CategoriesRepository();
    //     }
    //     return CategoriesRepository.INSTANCE;
    // }

    async create({ name, description }: ICreateCategoryDTO): Promise<void> {
        /**
         * este código foi feito quando não estava utilizando BD, isto é, os dados estavam sendo salvos dentro de um array local.

        START CODE FOR SAVE DATA INTO LOCAL ARRAY

        const category = new Category();

        Object.assign(category, {
            name,
            description,
            created_at: new Date(),
        });

        END
        */

        const category = this.repository.create({ name, description });

        await this.repository.save(category);
    }

    async list(): Promise<Category[]> {
        /**
        * código utilizando antes de utilizar o BD, isto é, estava listando todos as categorias dentro do array local (em memória)
        * 
        * START 

         return this.categories;

        END
        */

        const categories = await this.repository.find();
        return categories;
    }

    async findByName(name: string): Promise<Category> {
        /**
        * código utilizando antes de utilizar o BD, isto é, estava procurando dentro do array local (em memória
        * 
        * START 

         const category = this.categories.find(
            (category) => category.name === name
        );
        return category;

        END
        */

        // Select * from categories where name = "name" limit 1
        const category = await this.repository.findOne({ name });
        return category;
    }
}

export { CategoriesRepository };
