import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Page } from 'src/common/classes/Page';
import { PriceRV } from 'src/common/classes/PriceRV';
import { PriceRvService } from 'src/services/price-rv/price-rv.service';
import { PriceRvFormComponent } from '../price-rv-form/price-rv-form.component';

@Component({
  selector: 'app-price-rv-list',
  templateUrl: './price-rv-list.component.html',
  styleUrls: ['./price-rv-list.component.scss']
})
export class PriceRvListComponent implements AfterViewInit {
  private priceRvs: PriceRV[] = [];
  private dialogRef?: MatDialogRef<PriceRvFormComponent, any>;
  private searchFilter?: string;

  isLoading: boolean = false;
  errorLoading: boolean = false;
  totalItems: number = 0;

  displayedColumns: string[] = [
    'value',
    'title',
    'bolivaresPrice',
    'dollarPrice',
    'closePrice',
    'closeDollarPrice',
    'createDate',
    'closeDate',
    'relativeVar'
  ];
  dataSource = new MatTableDataSource<PriceRV>(this.priceRvs);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private priceRVService: PriceRvService, private dialog: MatDialog) { 
    // this.searchForm = new FormGroup({
    //   search: new FormControl()
    // });
    // this.searchForm.get('search')?.valueChanges
    //   .pipe(
    //     debounceTime(1000)
    //   ).subscribe(value => {
    //     this.applyFilter(value);
    //   })
  }

  ngAfterViewInit() {
    this.subscribeToPagination();
    this.dataSource.paginator = this.paginator;
    this.fetch();
  }

  fetch() {
    this.isLoading = true;
    this.errorLoading = false;
    //let filteredTitle: PriceRV | undefined = undefined;
    // if (this.searchFilter) {
    //   filteredTitle = new pric(this.searchFilter, this.searchFilter);
    // }
    let page = new Page<PriceRV>(this.paginator.pageSize, this.paginator.pageIndex * this.paginator.pageSize);
    this.priceRVService.getPriceRVs(page).subscribe(result => {
      this.isLoading = false;
      console.info('Did get Price RVs', result);
      this.priceRvs = result.data;
      this.totalItems = result.total;
      this.dataSource = new MatTableDataSource<PriceRV>(this.priceRvs);
    }, error => {
      console.error(error);
      this.isLoading = false;
      this.errorLoading = true;
    })
  }

  private applyFilter(search: string) {
    this.searchFilter = search;
    this.fetch();
  }

  async presentCreateModal() {
    this.dialogRef = this.dialog.open(PriceRvFormComponent, {
      width: '700px'
    });
    this.dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.fetch();
      }
    });
  }

  private subscribeToPagination() {
    this.paginator.page.subscribe(event => {
      this.fetch();
    })
  }

getCloseDollarPrice(priceRV: PriceRV): number | undefined {
    if (!priceRV.latestExchangeRate) {
      return undefined;
    }
    return priceRV.closePrice / priceRV.latestExchangeRate;
}

getDollarPrice(priceRV: PriceRV): number | undefined {
    if (!priceRV.exchangeRate?.value) {
        return undefined;
    }
    return priceRV.bolivaresPrice / priceRV.exchangeRate?.value;
}

getRelativeVar(priceRV: PriceRV): number | undefined {
  let closeDollarPrice = this.getCloseDollarPrice(priceRV);
  let dollarPrice = this.getDollarPrice(priceRV);
    if (!closeDollarPrice || !dollarPrice) {
        return undefined;
    }
    return (closeDollarPrice - dollarPrice) / dollarPrice;
}

}
