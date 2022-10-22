"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteFile = void 0;
var _fs = _interopRequireDefault(require("fs"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const deleteFile = async filename => {
  try {
    // stat -> verifica se o arquivo existe (ou não) no diretório pesquisado
    await _fs.default.promises.stat(filename);
  } catch {
    return;
  }
  // unlink -> deleta o arquivo
  await _fs.default.promises.unlink(filename);
};
exports.deleteFile = deleteFile;