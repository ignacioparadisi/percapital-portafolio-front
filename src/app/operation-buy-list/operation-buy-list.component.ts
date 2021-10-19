import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Operation } from 'src/common/classes/Operation';
import { OperationType } from 'src/common/classes/OperationType';
import { Page } from 'src/common/classes/Page';
import { OperationService } from 'src/services/operation/operation.service';
import { OperationFormComponent } from '../operation-form/operation-form.component';

@Component({
  selector: 'app-operation-buy-list',
  templateUrl: './operation-buy-list.component.html',
  styleUrls: ['./operation-buy-list.component.scss']
})
export class OperationBuyListComponent implements AfterViewInit {

  private operations: Operation[] = [];
  private dialogRef?: MatDialogRef<OperationFormComponent, any>;

  errorLoading: boolean = false;
  isLoading: boolean = false;
  totalItems: number = 0;

  displayedColumns: string[] = [
    'date',
    'value',
    'amount',
    'buyPrice',
    'buyValue',
    'comission',
    'taxes',
    'register',
    'totalCost',
    'totalUnitPrice',
    'exchangeRate',
    'totalCostUSD',
    'totalUnitPriceUSD',
    'marketPrice',
    'variation',
    'marketValue',
    'comission2',
    'taxes2',
    'register2',
    'totalIncome',
    'gp',
    'performance',
    'walletWeight',
    'weightedPerformance',
    'gpUSD',
    'performanceUSD',
    'weigthedPerformanceUSD'
  ];
  dataSource = new MatTableDataSource<Operation>(this.operations);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private operationService: OperationService, private dialog: MatDialog) { }

  ngAfterViewInit() {
    this.subscribeToPagination();
    this.dataSource.paginator = this.paginator;
    this.fetch();
  }

  fetch() {
    this.errorLoading = false;
    this.isLoading = true;
    let operation = new Operation(OperationType.BUY);
    let page = new Page<Operation>(this.paginator.pageSize, this.paginator.pageIndex * this.paginator.pageSize, operation);
    this.operationService.getBuyOperations(page).subscribe(result => {
      this.isLoading = false;
      console.info('Did get Buy Operations', result);
      this.operations = result.data ?? [];
      this.totalItems = result.total ?? 0;
      this.dataSource = new MatTableDataSource<Operation>(this.operations);
    }, error => {
      console.error(error)
      this.isLoading = false;
      this.errorLoading = true;
    })
  }

  async presentCreateModal() {
    this.dialogRef = this.dialog.open(OperationFormComponent, {
      width: '700px'
    });
    this.dialogRef.componentInstance.typeId = OperationType.BUY;
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
