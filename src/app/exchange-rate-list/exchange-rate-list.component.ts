import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ExchangeRate } from 'src/common/classes/ExchangeRate';
import { Page } from 'src/common/classes/Page';
import { ExchangeRateService } from 'src/services/exchange-rate/exchange-rate.service';
import { ExchangeRateFormComponent } from '../exchange-rate-form/exchange-rate-form.component';

@Component({
  selector: 'app-exchange-rate-list',
  templateUrl: './exchange-rate-list.component.html',
  styleUrls: ['./exchange-rate-list.component.scss']
})
export class ExchangeRateListComponent implements AfterViewInit {

  private exchangeRates: ExchangeRate[] = [];
  private dialogRef?: MatDialogRef<ExchangeRateFormComponent, any>;

  isLoading: boolean = false;
  totalItems: number = 0;

  displayedColumns: string[] = [
    'price',
    'date'
  ];
  dataSource = new MatTableDataSource<ExchangeRate>(this.exchangeRates);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private exchangeRateService: ExchangeRateService, private dialog: MatDialog) { }

  ngAfterViewInit() {
    this.subscribeToPagination();
    this.dataSource.paginator = this.paginator;
    this.fetchExchangeRates();
  }

  private fetchExchangeRates() {
    this.isLoading = true
    let page = new Page<ExchangeRate>(this.paginator.pageSize, this.paginator.pageIndex * this.paginator.pageSize);
    this.exchangeRateService.getExchangeRates(page).subscribe(((result) => {
      this.isLoading = false;
      console.info('Did get titles', result);
      this.exchangeRates = result.data;
      this.totalItems = result.total;
      this.dataSource = new MatTableDataSource<ExchangeRate>(this.exchangeRates);
    }))
  }

  async presentCreateModal() {
    this.dialogRef = this.dialog.open(ExchangeRateFormComponent, {
      width: '700px'
    });
    this.dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.fetchExchangeRates();
      }
    });
  }

  private subscribeToPagination() {
    this.paginator.page.subscribe(event => {
      this.fetchExchangeRates();
    })
  }
}
