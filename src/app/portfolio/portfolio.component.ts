import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent implements AfterViewInit {

  displayedColumns: string[] = [
    'name', 
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
  dataSource = new MatTableDataSource<PortfolioStock>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  constructor() {
  }
}

export interface PortfolioStock {
  name: string;
  description: string;
  price: number;
  amountOwned: number;
  averagePrice: number;
  totalPrice: number;
  totalPriceUSD: number;
  netValue: number;
  netValueUSD: number;
  gp: number;
  gpUSD: number;
  variation: number;
  variationUSD: number;
  port: number;
}

const ELEMENT_DATA: PortfolioStock[] = [
  {
    name: 'BPV',
    description: 'Banco Provincial',
    price: 115000,
    amountOwned: 37,
    averagePrice: 96530.65,
    totalPrice: 3571.63,
    totalPriceUSD: 144.08,
    netValue: 4053313,
    netValueUSD: 91.04,
    gp: 481679,
    gpUSD: -53.40,
    variation: 13.49,
    variationUSD: -36.81,
    port: 34.07
  }, {
    name: 'FVI.B',
    description: 'F.V.INM."B"',
    price: 308.5,
    amountOwned: 13090,
    averagePrice: 210.64,
    totalPrice: 2757.27,
    totalPriceUSD: 118.10,
    netValue: 3846851,
    netValueUSD: 86.41,
    gp: 1089581.21,
    gpUSD: -31.69,
    variation: 39.52,
    variationUSD: -26.83,
    port: 32.33
  }
];