import { Component } from '@angular/core';
import { Report } from '../../models/report';
import { ReportsService } from '../../services/reports.service';
declare var bootstrap: any;

@Component({
  selector: 'app-view-reports',
  templateUrl: './view-reports.component.html',
  styleUrl: './view-reports.component.scss'
})
export class ViewReportsComponent {
  arrReports:Report[] = [] ;
  selectedReport: Report | null = null;
  constructor(private reportService : ReportsService){
    this.reportService.getReports().subscribe(data => {
      this.arrReports = data ; 
    })
  }
  openModal(report: Report) {
    this.selectedReport = report;
    const modalElement = document.getElementById('barChartModal');
    const modal = new bootstrap.Modal(modalElement);
    modal.show();
  }
}
