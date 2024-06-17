export class Assessment {
    id: number;
    assessmentName: string;
    assessmentDescription: string;
    assessmentImage: string;
    constructor(id: number, aName: string, aDescription: string, aImage: string) {
        this.id = id;
        this.assessmentName = aName;
        this.assessmentDescription = aDescription;
        this.assessmentImage = aImage;
    }
}