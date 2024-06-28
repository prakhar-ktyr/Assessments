import { Component } from '@angular/core';
import { ExcelExportService } from '../../services/excel-export.service';
import { ReportsService } from '../../services/reports.service';
import { AttendanceService } from '../../services/attendance.service';
import { Report } from '../../models/report';
import { Attendance } from '../../models/attendance';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent {
  assessmentScores: Report[] = [];
  attendance: Attendance[] = [];

  constructor(
    private excelExportService: ExcelExportService,
    private reportsService: ReportsService,
    private attendanceService: AttendanceService
  ) {
    this.loadReports();
    this.loadAttendance();
  }

  loadReports(): void {
    this.reportsService.getReports().subscribe((data: Report[]) => {
      this.assessmentScores = data;
    });
  }

  loadAttendance(): void {
    this.attendanceService.getAttendanceRecords().subscribe((data: Attendance[]) => {
      this.attendance = data;
    });
  }

  generateReport(startDate: string, endDate: string): void {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const filteredScores = this.assessmentScores.filter(score => {
      const scoreDate = new Date(score.date); // Assuming you have a date property in the Report model
      return scoreDate >= start && scoreDate <= end;
    });

    const filteredAttendance = this.attendance.filter(att => {
      const attDate = new Date(att.date);
      return attDate >= start && attDate <= end;
    });

    const reportData = filteredScores.map(score => {
      const attendanceRecord = filteredAttendance.find(att => att.userId === score.userId);
      return {
        AssessmentId: score.assessmentId,
        TraineeId: score.userId,
        Score: score.score,
        AttendanceDate: attendanceRecord ? attendanceRecord.date : 'N/A',
        AttendanceStatus: attendanceRecord ? attendanceRecord.status : 'N/A'
      };
    });

    this.excelExportService.exportAsExcelFile(reportData, 'TraineePerformanceReport');
  }
}
