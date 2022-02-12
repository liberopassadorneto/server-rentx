import { Category } from "../../entities/Category";
import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

class ListCategoriesUseCase {
    constructor(private categoriesRepository: ICategoriesRepository) {}

    execute(): void {
        const categories = this.categoriesRepository.list();
    }
}

export { ListCategoriesUseCase };
