// Sobrescrevendo os tipos da InterfaceRequest do Express
declare namespace Express {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    export interface Request {
        user: {
            id: string;
        };
    }
}
