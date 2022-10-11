import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { StockHistoric } from 'src/common/classes/StockHistoric';
import { PredictionService } from 'src/services/prediction/prediction.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {

  latestsStocks: StockHistoric[] = [];
  isLoading: boolean = false;
  errorLoading: boolean = false;
  displayedColumns: string[] = [
    'symbol',
    'value',
    'date'
  ];
  dataSource = new MatTableDataSource<StockHistoric>(this.latestsStocks);
  

  constructor(private predictionService: PredictionService) { }

  ngOnInit(): void {
    this.fetchTodayStocks();
  }

  private fetchTodayStocks() {
    this.isLoading = true;
    this.errorLoading = false;
    this.predictionService.getTodayStocks().subscribe(result => {
      this.updateLatestStocks(result);
      this.isLoading = false;
    }, error => {
      console.error(error);
      this.isLoading = true;
      this.errorLoading = true;
    });
  }

  fetchStocksFromBVC() {
    this.isLoading = true;
    this.errorLoading = false;
    this.predictionService.getStocksFromBVC().subscribe(result => {
      this.updateLatestStocks(result);
      this.isLoading = false;
    }, error => {
      console.error(error);
      this.isLoading = true;
      this.errorLoading = true;
    });
  }

  private updateLatestStocks(result: StockHistoric[]) {
    this.latestsStocks = result;
    this.dataSource = new MatTableDataSource<StockHistoric>(this.latestsStocks);
  }

}
