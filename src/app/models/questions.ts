export class Questions {
    id: number;
    qText: string;
    options: string[];
    constructor(id: number, qText: string, options: string[]) {
        this.id = id;
        this.qText = qText;
        this.options = options;
    }

}