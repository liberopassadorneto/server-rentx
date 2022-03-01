import fs from "fs";

export const deleteFile = async (filename: string) => {
    try {
        // stat -> verifica se o arquivo existe (ou não) no diretório pesquisado
        await fs.promises.stat(filename);
    } catch {
        return;
    }
    // unlink -> deleta o arquivo
    await fs.promises.unlink(filename);
};
