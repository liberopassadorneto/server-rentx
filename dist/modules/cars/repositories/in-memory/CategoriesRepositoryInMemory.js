"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CategoriesRepositoryInMemory = void 0;
var _Category = require("@modules/cars/infra/typeorm/entities/Category");
class CategoriesRepositoryInMemory {
  constructor() {
    this.categories = [];
  }
  async findByName(name) {
    const category = await this.categories.find(category => category.name === name);
    return category;
  }
  async list() {
    const all = await this.categories;
    return all;
  }
  async create({
    name,
    description
  }) {
    const category = new _Category.Category();
    Object.assign(category, {
      name,
      description
    });
    await this.categories.push(category);
  }
}
exports.CategoriesRepositoryInMemory = CategoriesRepositoryInMemory;