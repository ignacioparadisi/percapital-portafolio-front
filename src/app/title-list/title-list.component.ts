import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Page } from 'src/common/classes/Page';
import { StockTitle } from 'src/common/classes/StockTitle';
import { StockTitleService } from 'src/services/stock-title/stock-title.service';
import { MatDialog } from '@angular/material/dialog';
import { TitleFormComponent } from '../title-form/title-form.component';

@Component({
  selector: 'app-title-list',
  templateUrl: './title-list.component.html',
  styleUrls: ['./title-list.component.scss']
})
export class TitleListComponent implements AfterViewInit {

  private titles: StockTitle[] = [];

  isLoading: boolean = false;
  totalItems: number = 0;

  displayedColumns: string[] = [
    'symbol',
    'name'
  ];
  dataSource = new MatTableDataSource<StockTitle>(this.titles);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private stockTitleService: StockTitleService, private dialog: MatDialog) { }

  ngAfterViewInit() {
    this.subscribeToPagination();
    this.dataSource.paginator = this.paginator;
    this.fetchTitles();
  }

  private fetchTitles() {
    this.isLoading = true
    let page = new Page<StockTitle>(this.paginator.pageSize, this.paginator.pageIndex * this.paginator.pageSize);
    this.stockTitleService.getTitles(page).subscribe(((result) => {
      this.isLoading = false;
      console.info('Did get titles', result);
      this.titles = result.data;
      this.totalItems = result.total;
      this.dataSource = new MatTableDataSource<StockTitle>(this.titles);
    }))
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  async presentCreateTitleModal() {
    const dialogRef = this.dialog.open(TitleFormComponent, {
      width: '700px',
      panelClass: 'my-dialog'
    });
  }

  private subscribeToPagination() {
    this.paginator.page.subscribe(event => {
      this.fetchTitles();
    })
  }

}
