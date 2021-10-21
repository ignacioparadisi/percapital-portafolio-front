import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
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
  @Input() isSelecting: boolean = false;
  private filterPriceRV: PriceRV = new PriceRV();
  private priceRvs: PriceRV[] = [];
  private titles: StockTitle[] = [];
  filteredTitles?: Observable<StockTitle[]>;
  private formDialogRef?: MatDialogRef<PriceRvFormComponent, any>;

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
      createDate: new FormControl({ value: '', disabled: false }, [])
    })

    this.form.get('createDate')?.valueChanges
      .pipe(
        debounceTime(100)
      ).subscribe(value => {
        if (this.filterPriceRV) {
          if (!value && this.filterPriceRV.createdAt) {
            console.log('Empty date');
            this.filterPriceRV.createdAt = undefined;
            this.fetch();
          } else if (value && typeof (value) == 'object') {
            console.info(`Filtering by date ${value}`);
            this.filterPriceRV.createdAt = value;
            this.fetch();
          }
        }
      });

    this.form.get('title')?.valueChanges
      .pipe(
        debounceTime(100)
      ).subscribe(value => {
        if (!value && this.filterPriceRV.titleId) {
          this.filterPriceRV.titleId = undefined;
          this.fetch();
        } else if (typeof (value) == 'object') {
          this.filterPriceRV.titleId = value.id;
          this.fetch();
        }
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
    var page = new Page<PriceRV>(this.paginator.pageSize, this.paginator.pageIndex * this.paginator.pageSize);
    console.log(page);
    if (this.filterPriceRV?.titleId || this.filterPriceRV?.createdAt) {
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
    this.formDialogRef = this.dialog.open(PriceRvFormComponent, {
      width: '700px'
    });
    this.formDialogRef.afterClosed().subscribe(result => {
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
    if (!priceRV.latestExchangeRate || !priceRV.closePrice) {
      return undefined;
    }
    return priceRV.closePrice / priceRV.latestExchangeRate;
  }

  getDollarPrice(priceRV: PriceRV): number | undefined {
    if (!priceRV.exchangeRate?.value || !priceRV.bolivaresPrice) {
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

  dismiss() {
    // this.dialogRef?.close();
  }

}
