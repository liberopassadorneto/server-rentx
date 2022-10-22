"use strict";

var _UsersRepositoryInMemory = require("@modules/accounts/repositories/in-memory/UsersRepositoryInMemory");
var _UsersTokensRepositoryInMemory = require("@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory");
var _DayJsDateProvider = require("@shared/container/providers/DateProvider/implementations/DayJsDateProvider");
var _MailProviderInMemory = require("@shared/container/providers/MailProvider/in-memory/MailProviderInMemory");
var _AppError = require("@shared/errors/AppError");
var _SendForgotPasswordMailUseCase = require("./SendForgotPasswordMailUseCase");
let sendForgotPasswordMailUseCase;
let usersRepositoryInMemory;
let dateProvider;
let usersTokensRepositoryInMemory;
let mailProviderInMemory;
describe("Send Forgot Mail", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new _UsersRepositoryInMemory.UsersRepositoryInMemory();
    dateProvider = new _DayJsDateProvider.DayJsDateProvider();
    usersTokensRepositoryInMemory = new _UsersTokensRepositoryInMemory.UsersTokensRepositoryInMemory();
    mailProviderInMemory = new _MailProviderInMemory.MailProviderInMemory();
    sendForgotPasswordMailUseCase = new _SendForgotPasswordMailUseCase.SendForgotPasswordMailUseCase(usersRepositoryInMemory, usersTokensRepositoryInMemory, dateProvider, mailProviderInMemory);
  });
  it("should be able to send a forgot password mail to user", async () => {
    const sendMail = jest.spyOn(mailProviderInMemory, "sendMail");
    await usersRepositoryInMemory.create({
      driver_license: "ABCD-1234",
      email: "teste@rentx.com",
      name: "Teste Rentx",
      password: "teste-rentx"
    });
    await sendForgotPasswordMailUseCase.execute("teste@rentx.com");
    expect(sendMail).toHaveBeenCalled();
  });
  it("should no be to send an email if user does not exists", async () => {
    await expect(sendForgotPasswordMailUseCase.execute("random@random.com")).rejects.toEqual(new _AppError.AppError("User does not exists"));
  });
  it("should be able to create an users token", async () => {
    const generateTokenMail = jest.spyOn(usersTokensRepositoryInMemory, "create");
    await usersRepositoryInMemory.create({
      driver_license: "XFXF-1414",
      email: "im@rentx.com.br",
      name: "Teste Rentx",
      password: "teste-rentx"
    });
    await sendForgotPasswordMailUseCase.execute("im@rentx.com.br");
    expect(generateTokenMail).toBeCalled();
  });
});