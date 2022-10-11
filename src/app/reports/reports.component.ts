import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Report } from 'src/common/classes/Report';
import { StockHistoric } from 'src/common/classes/StockHistoric';
import { PredictionService } from 'src/services/prediction/prediction.service';
import { ReportsService } from 'src/services/reports/reports.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {

  reports: Report[] = [];
  isLoading: boolean = false;
  errorLoading: boolean = false;
  reportsDisplayedColumns: string[] = [
    'symbol',
    'price',
    'stockChange',
    'buyQuotationChange',
    'sellQuotationChange'
  ]
  reportsDataSource = new MatTableDataSource<Report>(this.reports);
  

  constructor(private predictionService: PredictionService, private reportsService: ReportsService) { }

  ngOnInit(): void {
    this.fetchReports();
  }

  fetchStocksFromBVC() {
    this.isLoading = true;
    this.errorLoading = false;
    this.predictionService.getStocksFromBVC().subscribe(result => {
      this.fetchReports();
      this.isLoading = false;
    }, error => {
      console.error(error);
      this.isLoading = true;
      this.errorLoading = true;
    });
  }

  fetchReports() {
    this.isLoading = true;
    this.errorLoading = false;
    this.reportsService.getReports().subscribe(result => {
      this.isLoading = false;
      this.reports = result;
      this.reportsDataSource = new MatTableDataSource<Report>(this.reports);
    }, error => {
      console.error(error);
      this.isLoading = true;
      this.errorLoading = true;
    })
  }

  getColor(percentage: number) {
    if (percentage > 0) {
      return 'green';
    } else if (percentage < 0) {
      return 'red';
    }
    return 'black';
  }

  getIconName(percentage: number) {
    if (percentage > 0) {
      return 'arrow_upward';
    } else if (percentage < 0) {
      return 'arrow_downward';
    }
    return 'remove';
  }

  abs(value: number) {
    return Math.abs(value);
  }

}

