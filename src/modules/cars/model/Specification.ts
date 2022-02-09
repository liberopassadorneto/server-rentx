import { v4 as uuidv4 } from "uuid";

class Specification {
    id?: string;
    name: string;
    description: string;
    created_at: Date;

    constructor() {
        // se é um novo -> adicionar o id
        if (!this.id) {
            this.id = uuidv4();
        }
    }
}

export { Specification };
