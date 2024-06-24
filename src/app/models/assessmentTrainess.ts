export class AssessmentTrainees {
  id: string;
  assessmentId: string;
  traineeId: string;
  constructor(id: string, assessmentId: string, traineeId: string) {
    this.id = id;
    this.assessmentId = assessmentId;
    this.traineeId = traineeId;
  }
}
