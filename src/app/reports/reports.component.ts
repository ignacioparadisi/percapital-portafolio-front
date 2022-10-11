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
  reportsDisplayedColumns: string[] = [
    'symbol',
    'stockChange',
    'buyQuotationChange',
    'sellQuotationChange'
  ]
  reportsDataSource = new MatTableDataSource<Report>(reports);
  

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

class Report {
  symbol: string;
  stockChange: number;
  monetaryFundChange: number;
  buyQuotationChange: number;
  sellQuotationChange: number;

  constructor(symbol: string, stockChange: number, buyQuotationChange: number, sellQuotationChange: number) {
    this.symbol = symbol;
    this.stockChange = stockChange;
    this.buyQuotationChange = buyQuotationChange;
    this.sellQuotationChange = sellQuotationChange;
  }
}

var reports: Report[] = [
  new Report('ABC.A', 0.99 / 2.66, 0.38, 0.37),
  new Report('ALZ.B', 0, 0, 0),
  new Report('BNC', 0.02, 0.018, 0.018),
  new Report('BOU', 0, 0,  0),
  new Report('BPV', 0.21 / 2.03, 0.11, 0.11),
  new Report('BVCC', -0.01 / 0.51, -0.03, -0.01),
  new Report('BVL', 0.04 / 1.05, 0.04, 0.04),
  new Report('CCR', 0, 0, 0),
  new Report('CGQ', 0.195, 0.195, 0.195),
  new Report('CIE', 0, 0, 0),
  new Report('CRM.A', 0.016, 0.017, 0.017),
  new Report('DOM', -0.1, -0.1, -0.1),
  new Report('EFE', -0.155, -0.155, -0.155),
  new Report('ENV', -0.009, -0.009, -0.009),
  new Report('FNC', 0, 0, 0)
]

