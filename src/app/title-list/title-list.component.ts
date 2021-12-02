import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Page } from 'src/common/classes/Page';
import { StockTitle } from 'src/common/classes/StockTitle';
import { StockTitleService } from 'src/services/stock-title/stock-title.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { TitleFormComponent } from '../title-form/title-form.component';
import { FormControl, FormGroup } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-title-list',
  templateUrl: './title-list.component.html',
  styleUrls: ['./title-list.component.scss']
})
export class TitleListComponent implements AfterViewInit {

  private titles: StockTitle[] = [];
  private dialogRef?: MatDialogRef<TitleFormComponent, any>;
  private searchFilter?: string;
  searchForm: FormGroup;

  isLoading: boolean = false;
  errorLoading: boolean = false;
  totalItems: number = 0;

  displayedColumns: string[] = [
    'symbol',
    'name',
    'isinCode'
  ];
  dataSource = new MatTableDataSource<StockTitle>(this.titles);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private stockTitleService: StockTitleService, private dialog: MatDialog, private toastr: ToastrService) {
    this.searchForm = new FormGroup({
      search: new FormControl()
    });
    this.searchForm.get('search')?.valueChanges
      .pipe(
        debounceTime(1000)
      ).subscribe(value => {
        this.applyFilter(value);
      })
  }

  ngAfterViewInit() {
    this.subscribeToPagination();
    this.dataSource.paginator = this.paginator;
    this.fetch();
  }

  fetch() {
    this.isLoading = true;
    this.errorLoading = false;
    let filteredTitle: StockTitle | undefined = undefined;
    if (this.searchFilter) {
      filteredTitle = new StockTitle(this.searchFilter, this.searchFilter, this.searchFilter);
    }
    let page = new Page<StockTitle>(this.paginator.pageSize, this.paginator.pageIndex * this.paginator.pageSize, filteredTitle);
    this.stockTitleService.getTitles(page).subscribe(result => {
      this.isLoading = false;
      console.info('Did get titles', result);
      this.titles = result.data ?? [];
      this.totalItems = result.total ?? 0;
      this.dataSource = new MatTableDataSource<StockTitle>(this.titles);
    }, error => {
      console.error(error);
      this.errorLoading = true;
      this.isLoading = false;
      this.toastr.error('Hubo un error al listar los títulos', 'Error');
    })
  }

  private applyFilter(search: string) {
    this.searchFilter = search;
    this.fetch();
  }

  async presentCreateModal() {
    this.dialogRef = this.dialog.open(TitleFormComponent, {
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

}
