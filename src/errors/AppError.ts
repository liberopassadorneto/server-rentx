export class AppError {
    public readonly message: string;
    public readonly statusCode: number;

    // se não tiver nenhum statusCode, o valor default é 400
    constructor(message: string, statusCode = 400) {
        this.message = message;
        this.statusCode = statusCode;
    }
}
