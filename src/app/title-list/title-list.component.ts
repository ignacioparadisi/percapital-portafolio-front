import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Page } from 'src/common/classes/Page';
import { StockTitle } from 'src/common/classes/StockTitle';
import { StockTitleService } from 'src/services/stock-title/stock-title.service';
import {merge, Observable, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-title-list',
  templateUrl: './title-list.component.html',
  styleUrls: ['./title-list.component.scss']
})
export class TitleListComponent implements AfterViewInit {

  private titles: StockTitle[] = [];

  displayedColumns: string[] = [
    'symbol',
    'name'
  ];
  dataSource = new MatTableDataSource<StockTitle>(this.titles);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private stockTitleService: StockTitleService) { }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.fetchTitles();
  }

  private fetchTitles(page?: Page<StockTitle>) {
    this.stockTitleService.getTitles(page).subscribe(((result) => {
      console.info('Did get titles', result);
      this.titles = result;
      this.dataSource = new MatTableDataSource<StockTitle>(this.titles);
    }))
  }

}
