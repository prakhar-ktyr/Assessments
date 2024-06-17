export class Course {
    id: number;
    courseName: string;
    courseDescription: string;
    categoryId: number;
    constructor(id: number, cName: string, cDescription: string, cId: number) {
        this.id = id;
        this.courseName = cName;
        this.courseDescription = cDescription;
        this.categoryId = cId;
    }

}