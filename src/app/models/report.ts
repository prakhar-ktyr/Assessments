export class Report{
    id:number ; 
    assessmentId:string ; 
    userId:string ; 
    marks:boolean[] = [] ; 
    score:string ; 
    constructor( id:number , 
        assessmentId:string , 
        userId:string , 
        marks:boolean[] = [] , 
        score:string){
            this.id = id ; 
            this.assessmentId = assessmentId ;
            this.userId = userId ; 
            this.marks = marks ; 
            this.score = score ; 
        }
}