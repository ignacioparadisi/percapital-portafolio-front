import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Portfolio, PortfolioPage } from 'src/common/classes/Portfolio';
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
  totalItems: number = 0;
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

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.fetch();
  }

  constructor(private portfolioService: PortfolioService) {
  }

  fetch() {
    this.errorLoading = false;
    this.isLoading = true;
    this.portfolioService.getPortfolio().subscribe(result => {
      this.isLoading = false;
      console.info('Did get Buy Operations', result);
      this.page = result;
      this.dataSource = new MatTableDataSource<Portfolio>(this.page.data);
    }, error => {
      console.error(error)
      this.isLoading = false;
      this.errorLoading = true;
    })
  }
}