export class Question {
    id: number;
    text: string;
    type: 'multiple-choice' | 'true-false';
    choices?: string[];
    correctAnswer: string | boolean;

    constructor(id: number, text: string, type: 'multiple-choice' | 'true-false', correctAnswer: string | boolean, choices?: string[]) {
        this.id = id;
        this.text = text;
        this.type = type;
        this.correctAnswer = correctAnswer;
        this.choices = choices;
    }
}
