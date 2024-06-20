import { Assessment } from "./assessment";

export class Cart{
    id:number ; 
    arrAssessments:Assessment[] ; 
    constructor(id:number , arrAssessments:Assessment[]){
        this.id = id ; 
        this.arrAssessments = arrAssessments ; 
    }
}