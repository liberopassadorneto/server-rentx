"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ensureAuthenticated = ensureAuthenticated;
var _jsonwebtoken = require("jsonwebtoken");
var _auth = _interopRequireDefault(require("@config/auth"));
var _AppError = require("@shared/errors/AppError");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
async function ensureAuthenticated(request, response, next) {
  // Bearer 319csad1293dkao1 (token)
  const authHeader = request.headers.authorization;
  if (!authHeader) {
    throw new _AppError.AppError("Token missing from request", 401);
  }

  // fazendo o split de authHeader pelo espaço em branco " "
  // quebro o authHeader e crio/salvo um novo array da seguinte maneira:
  // salvo o Bearer em [0] e o token em [1], isto é
  // [0] = Bearer
  // [1] = 319csad1293dkao1 (token)
  // não preciso do Bearer, então salvo somente o token dentro da variavel token -> [, token]
  const [, token] = authHeader.split(" ");
  try {
    // preciso somente do sub (id do user) da resposta do verify(), por isso, vou fazer uma desestruturação
    const {
      sub: user_id
    } = (0, _jsonwebtoken.verify)(token, _auth.default.secret_token);
    request.user = {
      id: user_id
    };
    next();
  } catch (err) {
    throw new _AppError.AppError("Invalid token", 401);
  }
}