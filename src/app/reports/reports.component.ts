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

  download() {
    this.downloadFile(this.reports);
  }

  downloadFile(data: any, filename = 'data') {
    let headerTitles = {
      'symbol': 'Simbolo',
      'latestPrice': 'Último Precio',
      'changePercentage': 'Subida/Bajada de Acción',
      'buyChangePercentage': 'Subida/Bajada de Compra',
      'sellChangePercentage': 'Subida/Bajada de Venta'
    }
    let csvData = this.ConvertToCSV(data, headerTitles, ['symbol',
      'latestPrice',
      'changePercentage',
      'buyChangePercentage',
      'sellChangePercentage']);
    console.log(csvData)
    let blob = new Blob(['\ufeff' + csvData], { type: 'text/csv;charset=utf-8;' });
    let dwldLink = document.createElement("a");
    let url = URL.createObjectURL(blob);
    let isSafariBrowser = navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1;
    if (isSafariBrowser) {  //if Safari open in new window to save file with random filename.
      dwldLink.setAttribute("target", "_blank");
    }
    dwldLink.setAttribute("href", url);
    dwldLink.setAttribute("download", filename + ".csv");
    dwldLink.style.visibility = "hidden";
    document.body.appendChild(dwldLink);
    dwldLink.click();
    document.body.removeChild(dwldLink);
  }
  ConvertToCSV(objArray: any, headerTitles: any, headerList: string[]) {
    let array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    let str = '';
    let row = 'S.No,';
    for (let index in headerList) {
      let head = headerList[index];
      row += headerTitles[head] + ',';
    }
    row = row.slice(0, -1);
    str += row + '\r\n';
    for (let i = 0; i < array.length; i++) {
      let line = (i + 1) + '';
      for (let index in headerList) {
        let head = headerList[index];
        line += ',' + array[i][head];
      }
      line = line.replace(/null/g, '0');
      str += line + '\r\n';
    }
    return str;
  }

}

