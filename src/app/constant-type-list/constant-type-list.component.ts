import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ConstantType, TypeValue } from 'src/common/classes/ConstantType';
import { OperationService } from 'src/services/operation/operation.service';
import { ConstantValueFormComponent } from '../constant-value-form/constant-value-form.component';
import {FormControl} from "@angular/forms";
import {debounceTime} from "rxjs/operators";

@Component({
  selector: 'app-constant-type-list',
  templateUrl: './constant-type-list.component.html',
  styleUrls: ['./constant-type-list.component.scss']
})
export class ConstantTypeListComponent implements AfterViewInit {

  filterSelect = new FormControl({ value: '' });
  private constantValues: TypeValue[] = [];
  private filteredConstantValues: TypeValue[] = [];
  constantTypes: ConstantType[] = [];
  private dialogRef?: MatDialogRef<ConstantValueFormComponent, any>;

  isLoading: boolean = false;
  errorLoading: boolean = false;
  totalItems: number = 0;

  displayedColumns: string[] = [
    'type',
    'value',
    'date'
  ];
  dataSource = new MatTableDataSource<TypeValue>(this.filteredConstantValues);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private operationService: OperationService, private dialog: MatDialog) {
    this.filterSelect.valueChanges.subscribe(value => {
      this.applyFilter(value);
    })
  }

  ngAfterViewInit() {
    this.fetch();
  }

  fetch() {
    this.isLoading = true;
    this.errorLoading = false;
    this.operationService.getConstantTypes().subscribe(result => {
      this.isLoading = false;
      console.info('Did get Constant Types', result);
      this.configResult(result);
      this.dataSource = new MatTableDataSource<TypeValue>(this.filteredConstantValues);
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
    this.constantTypes = result;
    let values: TypeValue[] = [];
    result.forEach(constantType => {
      console.log(constantType.values)
      values = values.concat(constantType.values);
    });
    values.sort((value1, value2) => {
      // @ts-ignore
      return value1.createdAt - value2.createdAt;
    });
    if (values.length > 0) {
      this.constantValues = values;
      this.filteredConstantValues = values;
    }
  }

  getConstantTypeName(id: number): string | undefined {
    let constantType = this.constantTypes.filter(type => type.id === id);
    if (constantType.length > 0) {
      return constantType[0].name;
    }
    return undefined;
  }

  private applyFilter(value?: ConstantType) {
    this.filteredConstantValues = value ? value.values : this.constantValues;
    this.dataSource = new MatTableDataSource<TypeValue>(this.filteredConstantValues);
  }
}
