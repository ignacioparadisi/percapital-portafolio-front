import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ConstantType, TypeValue } from 'src/common/classes/ConstantType';
import { OperationService } from 'src/services/operation/operation.service';
import { ConstantValueFormComponent } from '../constant-value-form/constant-value-form.component';

@Component({
  selector: 'app-constant-type-list',
  templateUrl: './constant-type-list.component.html',
  styleUrls: ['./constant-type-list.component.scss']
})
export class ConstantTypeListComponent implements AfterViewInit {

  private constantValues: TypeValue[] = [];
  private dialogRef?: MatDialogRef<ConstantValueFormComponent, any>;

  isLoading: boolean = false;
  errorLoading: boolean = false;
  totalItems: number = 0;

  displayedColumns: string[] = [
    'value',
    'date'
  ];
  dataSource = new MatTableDataSource<TypeValue>(this.constantValues);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private operationServicew: OperationService, private dialog: MatDialog) { }

  ngAfterViewInit() {
    this.fetch();
  }

  fetch() {
    this.isLoading = true;
    this.errorLoading = false;
    this.operationServicew.getConstantTypes().subscribe(result => {
      this.isLoading = false;
      console.info('Did get Constant Types', result);
      this.configResult(result);
      this.dataSource = new MatTableDataSource<TypeValue>(this.constantValues);
    }, error => {
      console.error(error);
      this.isLoading = false;
      this.errorLoading = true;
    })
  }

  async presentCreateModal() {
    this.dialogRef = this.dialog.open(ConstantValueFormComponent, {
      width: '700px'
    });
    this.dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.fetch();
      }
    });
  }

  private configResult(result: ConstantType[]) {
    let values = result.filter(
      constant => constant.id == ConstantType.COMISSION
    );
    if (values.length > 0) {
      this.constantValues = values[0].values;
    } 
  }

}
