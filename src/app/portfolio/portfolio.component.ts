import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Portfolio, PortfolioPage, PortfolioTotalValue } from 'src/common/classes/Portfolio';
import { ExchangeRateService } from 'src/services/exchange-rate/exchange-rate.service';
import { PortfolioService } from 'src/services/portfolio/portfolio.service';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent implements AfterViewInit {

  page?: PortfolioPage;
  errorLoading: boolean = false;
  isLoading: boolean = false;
  totalValues: PortfolioTotalValue[] = [];
  exchangeRateDisplayedColumns: string[] = [
    'name',
    'value'
  ]
  totalDisplayedColumns: string[] = [
    'name',
    'bs',
    'usd'
  ]
  displayedColumns: string[] = [
    'symbol', 
    'description', 
    'price', 
    'amountOwned',
    'averagePrice',
    'totalPrice',
    'totalPriceUSD',
    'netValue',
    'netValueUSD',
    'gp',
    'gpUSD',
    'variation',
    'variationUSD',
    'port' 
  ];
  dataSource = new MatTableDataSource<Portfolio>(this.page?.data);
  totalDataSource = new MatTableDataSource<PortfolioTotalValue>(this.totalValues);
  exchangeRateDataSource = new MatTableDataSource<number>([1]);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.fetch();
    this.fetchLatestExchangeRate();
  }

  constructor(private portfolioService: PortfolioService, private exchangeRateService: ExchangeRateService) {
  }

  fetch() {
    this.errorLoading = false;
    this.isLoading = true;
    this.portfolioService.getPortfolio().subscribe(result => {
      this.isLoading = false;
      console.info('Did get Buy Operations', result);
      this.page = result;
      this.dataSource = new MatTableDataSource<Portfolio>(this.page.data);
      this.setTotalValues(result);
    }, error => {
      console.error(error)
      this.isLoading = false;
      this.errorLoading = true;
    })
  }

  private fetchLatestExchangeRate() {
    this.exchangeRateService.getLatestExchangeRate().subscribe(results => {
      this.exchangeRateDataSource = new MatTableDataSource<number>([results.value]);
    }, error => {
      console.error(error);
    })
  }

  private setTotalValues(result: PortfolioPage) {
    this.totalValues.push({
      name: 'Variación',
      valueBs: undefined,
      valueUSD: undefined
    });
    this.totalValues.push({
      name: 'Monto Bruto',
      valueBs: result.totalRawValue,
      valueUSD: result.totalDollarRawValue
    });
    this.totalValues.push({
      name: 'Rendimiento',
      valueBs: undefined,
      valueUSD: undefined
    });
    this.totalDataSource = new MatTableDataSource<PortfolioTotalValue>(this.totalValues);
  }
}