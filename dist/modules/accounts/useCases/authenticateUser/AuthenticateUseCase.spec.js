"use strict";

var _UsersRepositoryInMemory = require("@modules/accounts/repositories/in-memory/UsersRepositoryInMemory");
var _UsersTokensRepositoryInMemory = require("@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory");
var _AuthenticateUserUseCase = require("@modules/accounts/useCases/authenticateUser/AuthenticateUserUseCase");
var _CreateUserUseCase = require("@modules/accounts/useCases/createUser/CreateUserUseCase");
var _DayJsDateProvider = require("@shared/container/providers/DateProvider/implementations/DayJsDateProvider");
var _AppError = require("@shared/errors/AppError");
let authenticateUserUseCase;
let usersRepositoryInMemory;
let usersTokensRepositoryInMemory;
let dateProvider;
let createUserUseCase;
describe("Authenticate User", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new _UsersRepositoryInMemory.UsersRepositoryInMemory();
    usersTokensRepositoryInMemory = new _UsersTokensRepositoryInMemory.UsersTokensRepositoryInMemory();
    dateProvider = new _DayJsDateProvider.DayJsDateProvider();
    authenticateUserUseCase = new _AuthenticateUserUseCase.AuthenticateUserUseCase(usersRepositoryInMemory, usersTokensRepositoryInMemory, dateProvider);
    createUserUseCase = new _CreateUserUseCase.CreateUserUseCase(usersRepositoryInMemory);
  });
  it("should be able to authenticate an user", async () => {
    const user = {
      driver_license: "000123",
      email: "user@test.com",
      password: "1234",
      name: "User Test"
    };
    await createUserUseCase.execute(user);
    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password
    });
    expect(result).toHaveProperty("token");
  });
  it("should not be able to authenticate an non existent user", async () => {
    await expect(authenticateUserUseCase.execute({
      email: "false@gmail.com",
      password: "1234"
    })).rejects.toEqual(new _AppError.AppError("Email or password incorrect"));
  });
  it("should not be able to authenticate with incorrect password", async () => {
    const user = {
      driver_license: "000123",
      email: "user@test.com",
      password: "1234",
      name: "User Test Error"
    };
    await createUserUseCase.execute(user);
    await expect(authenticateUserUseCase.execute({
      email: user.email,
      password: "incorrect password"
    })).rejects.toEqual(new _AppError.AppError("Email or password incorrect"));
  });
});