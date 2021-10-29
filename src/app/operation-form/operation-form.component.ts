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
  priceRVs: PriceRV[] = [];
  filteredTitles?: Observable<StockTitle[]>;
  tax: ConstantType | undefined = undefined;
  comission: ConstantType | undefined = undefined;
  register: ConstantType | undefined = undefined;
  public validationMessages = {
    value: [],
    date: []
  };

  constructor(private operationService: OperationService, 
    private stockTitleService: StockTitleService, 
    private priceRVService: PriceRvService,
    private dialogRef: MatDialogRef<OperationFormComponent>,
    private dialog: MatDialog) { 
      
  }

  ngOnInit(): void {
    this.title += this.typeId == OperationType.BUY ? 'de Compra' : 'de Venta'
    this.createForm();
    if (this.typeId == OperationType.SELL) {
      this.fetchTitles();
    }
    this.fetchConstants();
    this.fetchPriceRVs();
  }

  private fetchTitles() {
    this.stockTitleService.getTitlesWithAmount().subscribe(results => {
      this.titles = results ?? [];
      console.log(results);
    }, error => {
      console.error(error);
    })
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

  private fetchPriceRVs() {
    var page = new Page<PriceRV>(undefined, undefined, undefined, true);
    console.log(page);
    this.priceRVService.getPriceRVs(page).subscribe(result => {
      console.info('Did get Price RVs', result);
      this.priceRVs = result.data ?? [];
    }, error => {
      console.error(error);
    })
  }

  getOptionText(option?: StockTitle): string {
    return option && option.symbol && option.name ? `${option.symbol} | ${option.name}` : '';
  }

  submit() {
    this.validateValueField();
    this.validateDateField();
    if (!this.form.valid) {
      return;
    }
    let priceRV = this.form.get('priceRV')?.value as PriceRV;
    let date = this.form.get('date')?.value;
    let tax = this.form.get('tax')?.value;
    let comission = this.form.get('comission')?.value;
    let register = this.form.get('register')?.value;
    let stockAmount = this.form.get('stockAmount')?.value;
    let stockPrice = this.form.get('stockPrice')?.value;

    if (!(this.typeId && priceRV && date && tax && comission && register && stockAmount && stockPrice)) {
      throw Error('Required fields');
    }

    if (this.typeId == OperationType.SELL) {
      const filteredTitles = this.titles.filter((title) => priceRV.titleId == title.id);
      const title = filteredTitles.length > 0 ? filteredTitles[0] : undefined;
      let currentAmount = title?.stockAmount;
      if (!currentAmount) {
        console.info('No tienes acciones para vender');
        return;
      }
      if (currentAmount < stockAmount) {
        this.showAlert(priceRV, stockAmount, stockPrice, tax, comission, register, date);
        return
      }
    }
    this.createOperation(this.typeId, priceRV.id, stockAmount, stockPrice, tax.id, comission.id, register.id, date);
  }

  dismiss(operation?: Operation) {
    this.dialogRef.close(operation);
  }

  private createForm() {
    this.form = new FormGroup({
      priceRV: new FormControl({ value: '', disabled: false }, [Validators.required]),
      tax: new FormControl({ value: '', disabled: false }, [Validators.required]),
      comission: new FormControl({ value: '', disabled: false }, [Validators.required]),
      register: new FormControl({ value: '', disabled: false }, [Validators.required]),
      stockAmount: new FormControl({ value: '', disabled: false }, [Validators.required]),
      stockPrice: new FormControl({ value: '', disabled: false }, [Validators.required]),
      date: new FormControl({ value: (new Date()).toISOString(), disabled: false }, [Validators.required])
    })
  }

  /**
   * Valida la información que contiene el campo de email.
   */
  private validateValueField() {
    this.validationMessages.value = [];
    const nameErrors = this.form.get('value')?.errors;
    console.log(nameErrors);
    if (nameErrors) {
      if (nameErrors.required) {
        // @ts-ignore
        this.validationMessages.value.push('La tasa de cambio es obligatoria.');
      }
    }
  }

  private validateDateField() {
    this.validationMessages.value = [];
    const nameErrors = this.form.get('date')?.errors;
    console.log(nameErrors);
    if (nameErrors) {
      if (nameErrors.required) {
        // @ts-ignore
        this.validationMessages.date.push('La fecha es obligatoria.');
      }
    }
  }

  private createOperation(typeId: number, priceRVId: number, stockAmount: number, stockPrice: number, taxId: number, comissionId: number, registerId: number, createdAt?: Date) {
    this.isLoading = true;
    let operation = new Operation(typeId, priceRVId, stockAmount, stockPrice, taxId, comissionId, registerId, createdAt);
    this.operationService.createOperation(operation).subscribe(result => {
      this.isLoading = false;
      this.dismiss(result);
    }, error => {
      this.isLoading = false;
      console.error(error);
    })
  }

  private async showAlert(priceRV: PriceRV, stockAmount: number, stockPrice: number, tax: ConstantType, comission: ConstantType, register: ConstantType, date: Date) {
    let dialogRef = this.dialog.open(AlertDialogComponent);
    dialogRef.componentInstance.title = 'Operación en corto';
    dialogRef.componentInstance.message = 'Estas por irte en corto con esta operación. ¿Quieres continuar?';
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.createOperation(this.typeId, priceRV.id, stockAmount, stockPrice, tax.id, comission.id, register.id, date);
      }
    });
  }
}
