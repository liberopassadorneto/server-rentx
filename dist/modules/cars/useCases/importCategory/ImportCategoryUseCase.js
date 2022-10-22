"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ImportCategoryUseCase = void 0;
var _csvParse = require("csv-parse");
var _fs = _interopRequireDefault(require("fs"));
var _tsyringe = require("tsyringe");
var _ICategoriesRepository = require("@modules/cars/repositories/ICategoriesRepository");
var _dec, _dec2, _dec3, _dec4, _class;
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
let ImportCategoryUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)("CategoriesRepository")(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _ICategoriesRepository.ICategoriesRepository === "undefined" ? Object : _ICategoriesRepository.ICategoriesRepository]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class ImportCategoryUseCase {
  constructor(categoriesRepository) {
    this.categoriesRepository = categoriesRepository;
  }
  loadCategories(file) {
    return new Promise((resolve, reject) => {
      const categories = [];
      const stream = _fs.default.createReadStream(file.path);
      const parseFile = (0, _csvParse.parse)();

      // pegar os pedaços que foram lidos do arquivo csv e faz alguma coisa
      stream.pipe(parseFile);
      parseFile.on("data", async line => {
        // ["name", "description"] => destruturação
        const [name, description] = line;
        categories.push({
          name,
          description
        });
      }).on("end", () => {
        // deletar o arquivo.csv na pasta "tmp" após o upload
        _fs.default.promises.unlink(file.path);
        resolve(categories);
      }).on("error", err => {
        reject(err);
      });
    });
  }

  // recebe o request da Controller e faz alguma coisa
  async execute(file) {
    const categories = await this.loadCategories(file);
    categories.map(async category => {
      const {
        name,
        description
      } = category;
      const existCategory = await this.categoriesRepository.findByName(name);
      if (!existCategory) {
        await this.categoriesRepository.create({
          name,
          description
        });
      }
    });
  }
}) || _class) || _class) || _class) || _class);
exports.ImportCategoryUseCase = ImportCategoryUseCase;