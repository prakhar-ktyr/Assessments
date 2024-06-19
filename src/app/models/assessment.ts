import { Question } from './questions';

export class Assessment {
    id: number;
    assessmentName: string;
    assessmentDescription: string;
    assessmentImage: string;
    questions: Question[];

    constructor(id: number, name: string, description: string, assessmentImage: string, questions: Question[]) {
        this.id = id;
        this.assessmentName = name;
        this.assessmentDescription = description;
        this.assessmentImage = assessmentImage;
        this.questions = questions;
    }
}
