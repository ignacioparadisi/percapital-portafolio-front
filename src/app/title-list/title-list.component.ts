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

  displayedColumns: string[] = [
    'symbol',
    'name'
  ];
  dataSource = new MatTableDataSource<StockTitle>(this.titles);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private stockTitleService: StockTitleService, private dialog: MatDialog) { }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.fetchTitles();
  }

  private fetchTitles(page?: Page<StockTitle>) {
    this.isLoading = true
    this.stockTitleService.getTitles(page).subscribe(((result) => {
      this.isLoading = false;
      console.info('Did get titles', result);
      this.titles = result;
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

}
