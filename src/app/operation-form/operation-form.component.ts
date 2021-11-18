import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ConstantType } from 'src/common/classes/ConstantType';
import { Operation } from 'src/common/classes/Operation';
import { OperationType } from 'src/common/classes/OperationType';
import { Page } from 'src/common/classes/Page';
import { PriceRV } from 'src/common/classes/PriceRV';
import { StockTitle } from 'src/common/classes/StockTitle';
import { OperationService } from 'src/services/operation/operation.service';
import { PriceRvService } from 'src/services/price-rv/price-rv.service';
import { StockTitleService } from 'src/services/stock-title/stock-title.service';
import { AlertDialogComponent } from '../alert-dialog/alert-dialog.component';

@Component({
  selector: 'app-operation-form',
  templateUrl: './operation-form.component.html',
  styleUrls: ['./operation-form.component.scss']
})
export class OperationFormComponent implements OnInit {
  @Input() typeId: number;

  title = 'Registrar Operación ';
  isLoading = false;
  form: FormGroup;
  private titles: StockTitle[] = [];
  filteredTitles?: Observable<StockTitle[]>;
  titlesWithStocks?: Observable<StockTitle[]>;
  tax: ConstantType | undefined = undefined;
  comission: ConstantType | undefined = undefined;
  register: ConstantType | undefined = undefined;
  public validationMessages = {
    exchangeRate: [],
    stockAmount: [],
    stockPrice: [],
    date: []
  };

  constructor(private operationService: OperationService,
    private stockTitleService: StockTitleService,
    private dialogRef: MatDialogRef<OperationFormComponent>,
    private dialog: MatDialog) {

  }

  ngOnInit(): void {
    this.title += this.typeId == OperationType.BUY ? 'de Compra' : 'de Venta'
    this.createForm();
    this.fetchTitles();
    this.fetchConstants();
  }

  private fetchTitles() {
    this.stockTitleService.getTitlesWithAmount().subscribe(results => {
      this.titles = results ?? [];
      this.setupTitleFilter();
      console.log(results);
    }, error => {
      console.error(error);
    })
  }

  private setupTitleFilter() {
    this.filteredTitles = this.form.get('title')?.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(name => name ? this._filter(name) : this.titles.slice())
      );
  }

  private _filter(name: string): StockTitle[] {
    const filterValue = name.toLowerCase();
    return this.titles.filter(title => (title.symbol.toLowerCase().includes(filterValue) || title.name.toLowerCase().includes(filterValue)));
  }

  private fetchConstants() {
    this.operationService.getConstantTypes().subscribe(results => {
      console.info('Did get constants', results);
      if (results.length != 3) {
        // TODO: SHOW ERROR
        return;
      }
      this.tax = results.filter(value => value.id == ConstantType.TAX)[0];
      this.comission = results.filter(value => value.id == ConstantType.COMISSION)[0];
      this.register = results.filter(value => value.id == ConstantType.REGISTER)[0];
      this.form.get('tax')?.setValue(this.tax.values[0]);
      this.form.get('comission')?.setValue(this.comission.values[0]);
      this.form.get('register')?.setValue(this.register.values[0]);
    }, error => {
      console.error(error);
    })
  }

  getOptionText(option?: StockTitle): string {
    return option && option.symbol && option.name ? `${option.symbol} | ${option.name}` : '';
  }

  submit() {
    this.validateDateField();
    if (!this.form.valid) {
      return;
    }
    let selectedTitle = this.form.get('title')?.value;
    let exchangeRate = this.form.get('exchangeRate')?.value;
    let date = this.form.get('date')?.value;
    let tax = this.form.get('tax')?.value;
    let comission = this.form.get('comission')?.value;
    let register = this.form.get('register')?.value;
    let stockAmount = this.form.get('stockAmount')?.value;
    let stockPrice = this.form.get('stockPrice')?.value;
    let otherComission = this.form.get('otherComission')?.value;

    if (!(this.typeId && selectedTitle && exchangeRate && date && tax && comission && register && stockAmount && stockPrice)) {
      throw Error('Required fields');
    }

    if (otherComission !== null && otherComission !== undefined && isNaN(otherComission)) {
      throw Error('Other comission must be a number');
    }

    if (this.typeId == OperationType.SELL) {
      const titlesWithStocks = this.titles.filter((title) => selectedTitle.id == title.id);
      const title = titlesWithStocks.length > 0 ? titlesWithStocks[0] : undefined;
      let currentAmount = title?.stockAmount;
      if (!currentAmount) {
        console.info('No tienes acciones para vender');
        return;
      }
      if (currentAmount < stockAmount) {
        this.showAlert(selectedTitle, stockAmount, stockPrice, exchangeRate, tax, comission, register, date);
        return
      }
    }
    this.createOperation(this.typeId, selectedTitle.id, stockAmount, stockPrice, exchangeRate, tax.id, comission.id, register.id, date, otherComission);
  }

  dismiss(operation?: Operation) {
    this.dialogRef.close(operation);
  }

  private createForm() {
    this.form = new FormGroup({
      title: new FormControl({ value: '', disabled: false }, [Validators.required]),
      exchangeRate: new FormControl({ value: '', disabled: false }, [Validators.required]),
      tax: new FormControl({ value: '', disabled: false }, [Validators.required]),
      comission: new FormControl({ value: '', disabled: false }, [Validators.required]),
      register: new FormControl({ value: '', disabled: false }, [Validators.required]),
      stockAmount: new FormControl({ value: '', disabled: false }, [Validators.required]),
      stockPrice: new FormControl({ value: '', disabled: false }, [Validators.required]),
      date: new FormControl({ value: (new Date()).toISOString(), disabled: false }, [Validators.required]),
      otherComission: new FormControl({ value: '', disabled: false }, [Validators.pattern(/^\d+(\.\d{1,2})?$/)])
    })
  }

  private validateDateField() {
    this.validationMessages.date = [];
    const nameErrors = this.form.get('date')?.errors;
    console.log(nameErrors);
    if (nameErrors) {
      if (nameErrors.required) {
        // @ts-ignore
        this.validationMessages.date.push('La fecha es obligatoria.');
      }
    }
  }

  private createOperation(typeId: number, titleId: number, stockAmount: number, stockPrice: number,  exchangeRate: number, taxId: number, comissionId: number, registerId: number, createdAt?: Date, otherComission?: number) {
    this.isLoading = true;
    let operation = new Operation(typeId, titleId, stockAmount, stockPrice, exchangeRate, taxId, comissionId, registerId, createdAt, otherComission);
    this.operationService.createOperation(operation).subscribe(result => {
      this.isLoading = false;
      this.dismiss(result);
    }, error => {
      this.isLoading = false;
      console.error('Server error:', error);
    })
  }

  private async showAlert(title: StockTitle, stockAmount: number, stockPrice: number, exchangeRate: number, tax: ConstantType, comission: ConstantType, register: ConstantType, date: Date) {
    let dialogRef = this.dialog.open(AlertDialogComponent);
    dialogRef.componentInstance.title = 'Operación en corto';
    dialogRef.componentInstance.message = 'Estas por irte en corto con esta operación. ¿Quieres continuar?';
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.createOperation(this.typeId, title.id, stockAmount, stockPrice, exchangeRate, tax.id, comission.id, register.id, date);
      }
    });
  }
}
