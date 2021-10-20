import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { debounceTime, map, startWith } from 'rxjs/operators';
import { Page } from 'src/common/classes/Page';
import { PriceRV } from 'src/common/classes/PriceRV';
import { StockTitle } from 'src/common/classes/StockTitle';
import { PriceRvService } from 'src/services/price-rv/price-rv.service';
import { StockTitleService } from 'src/services/stock-title/stock-title.service';
import { PriceRvFormComponent } from '../price-rv-form/price-rv-form.component';

@Component({
  selector: 'app-price-rv-list',
  templateUrl: './price-rv-list.component.html',
  styleUrls: ['./price-rv-list.component.scss']
})
export class PriceRvListComponent implements AfterViewInit {
  private filterPriceRV?: PriceRV
  private priceRvs: PriceRV[] = [];
  private titles: StockTitle[] = [];
  filteredTitles?: Observable<StockTitle[]>;
  private dialogRef?: MatDialogRef<PriceRvFormComponent, any>;

  form: FormGroup;

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

  constructor(private priceRVService: PriceRvService, private stockTitleService: StockTitleService, private dialog: MatDialog) { 
  }

  ngOnInit(): void {
    this.createForm();
    this.fetchTitles();
  }

  ngAfterViewInit() {
    this.subscribeToPagination();
    this.dataSource.paginator = this.paginator;
    this.fetch();
  }

  private createForm() {
    this.form = new FormGroup({
      title: new FormControl({ value: '', disabled: false }, []),
      createDate: new FormControl({ value: (new Date()).toISOString(), disabled: false }, [])
    })

    this.form.get('createDate')?.valueChanges
      .pipe(
        debounceTime(100)
      ).subscribe(value => {
        if (this.filterPriceRV) {
          this.filterPriceRV.createdAt = value
          this.fetch();
        }
      });

      this.form.get('title')?.valueChanges
      .pipe(
        debounceTime(100)
      ).subscribe(value => {
        if (value as StockTitle && this.filterPriceRV) {
          this.filterPriceRV.titleId = value.id;
          this.fetch();
        }
        console.log(value instanceof Object)
      });
  }

  private setupTitleFilter() {
    this.filteredTitles = this.form.get('title')?.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(name => name ? this._filterTitle(name) : this.titles.slice())
      );
  }

  private _filterTitle(name: string): StockTitle[] {
    const filterValue = name.toLowerCase();
    return this.titles.filter(title => (title.symbol.toLowerCase().includes(filterValue) || title.name.toLowerCase().includes(filterValue)));
  }

  private fetchTitles() {
    this.stockTitleService.getTitles().subscribe(results => {
      this.titles = results.data ?? [];
      this.setupTitleFilter();
      console.log(results.data);
    }, error => {
      console.error(error);
    })
  }

  getOptionText(option?: StockTitle): string {
    return option && option.symbol && option.name ? `${option.symbol} | ${option.name}` : '';
  }

  fetch() {
    this.isLoading = true;
    this.errorLoading = false;
    //let filteredTitle: PriceRV | undefined = undefined;
    // if (this.searchFilter) {
    //   filteredTitle = new pric(this.searchFilter, this.searchFilter);
    // }
    var page = new Page<PriceRV>(this.paginator.pageSize, this.paginator.pageIndex * this.paginator.pageSize);
    if (this.filterPriceRV) {
      page = new Page<PriceRV>(this.paginator.pageSize, this.paginator.pageIndex * this.paginator.pageSize, this.filterPriceRV);
    }
    this.priceRVService.getPriceRVs(page).subscribe(result => {
      this.isLoading = false;
      console.info('Did get Price RVs', result);
      this.priceRvs = result.data ?? [];
      this.totalItems = result.total ?? 0;
      this.dataSource = new MatTableDataSource<PriceRV>(this.priceRvs);
    }, error => {
      console.error(error);
      this.isLoading = false;
      this.errorLoading = true;
    })
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
