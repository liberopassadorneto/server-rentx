"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ImportCategoryController = void 0;
var _tsyringe = require("tsyringe");
var _ImportCategoryUseCase = require("./ImportCategoryUseCase");
class ImportCategoryController {
  // tudo o que estava na rota => post("/import",...)
  async handle(request, response) {
    const {
      file
    } = request;
    const importCategoryUseCase = _tsyringe.container.resolve(_ImportCategoryUseCase.ImportCategoryUseCase);
    await importCategoryUseCase.execute(file);
    return response.status(201).send();
  }
}
exports.ImportCategoryController = ImportCategoryController;