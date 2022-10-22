"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateUsersNew1645373026760 = void 0;
var _typeorm = require("typeorm");
class CreateUsersNew1645373026760 {
  async up(queryRunner) {
    await queryRunner.createTable(new _typeorm.Table({
      name: "users",
      columns: [{
        name: "id",
        type: "uuid",
        isPrimary: true
      }, {
        name: "name",
        type: "varchar"
      }, {
        name: "avatar",
        type: "varchar",
        isNullable: true
      }, {
        name: "password",
        type: "varchar"
      }, {
        name: "email",
        type: "varchar"
      }, {
        name: "driver_license",
        type: "varchar"
      }, {
        name: "isAdmin",
        type: "boolean",
        default: false
      }, {
        name: "created_at",
        type: "timestamp",
        default: "now()"
      }]
    }));
  }
  async down(queryRunner) {
    await queryRunner.dropTable("users");
  }
}
exports.CreateUsersNew1645373026760 = CreateUsersNew1645373026760;