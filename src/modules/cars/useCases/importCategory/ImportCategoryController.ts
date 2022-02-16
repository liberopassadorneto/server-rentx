import { Request, Response } from "express";
import { container } from "tsyringe";

import { ImportCategoryUseCase } from "./ImportCategoryUseCase";

class ImportCategoryController {
    // tudo o que estava na rota => post("/import",...)
    async handle(request: Request, response: Response): Promise<Response> {
        const { file } = request;

        const importCategoryUseCase = container.resolve(ImportCategoryUseCase);

        await importCategoryUseCase.execute(file);
        return response.send();
    }
}

export { ImportCategoryController };
