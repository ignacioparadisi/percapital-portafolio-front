import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Portfolio, PortfolioPage, PortfolioTotalValue } from 'src/common/classes/Portfolio';
import { ExchangeRateService } from 'src/services/exchange-rate/exchange-rate.service';
import { PortfolioService } from 'src/services/portfolio/portfolio.service';
import {ToastrService} from "ngx-toastr";

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

  constructor(private portfolioService: PortfolioService,
              private exchangeRateService: ExchangeRateService,
              private toastr: ToastrService) {
  }

  get totalPercentage(): number {
      return this.page?.data?.map(element => element.percentageInFolio)
        .reduce((previous, current) => (previous ?? 0) + (current ?? 0)) ?? 0
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
      console.error(error);
      this.isLoading = false;
      this.errorLoading = true;
      this.toastr.error('Hubo un error al obtener el portafolio', 'Error');
    })
  }

  private fetchLatestExchangeRate() {
    this.exchangeRateService.getLatestExchangeRate().subscribe(results => {
      this.exchangeRateDataSource = new MatTableDataSource<number>([results.value]);
    }, error => {
      console.error(error);
      this.toastr.error('Hubo un error al obtener la tasa de cambio', 'Error');
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
      valueBs: result.performance,
      valueUSD: result.performance
    });
    this.totalDataSource = new MatTableDataSource<PortfolioTotalValue>(this.totalValues);
  }

}
