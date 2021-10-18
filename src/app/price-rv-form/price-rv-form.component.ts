import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { PriceRV } from 'src/common/classes/PriceRV';
import { PriceRvService } from 'src/services/price-rv/price-rv.service';

@Component({
  selector: 'app-price-rv-form',
  templateUrl: './price-rv-form.component.html',
  styleUrls: ['./price-rv-form.component.scss']
})
export class PriceRvFormComponent implements OnInit {

  isLoading = false;
  form: FormGroup;
  public validationMessages = {
    name: [],
    symbol: []
  };

  constructor(private priceRVService: PriceRvService, private dialogRef: MatDialogRef<PriceRvFormComponent>) { 
  }

  ngOnInit(): void {
    this.createForm();
  }

  submit() {
    this.validateTitleField();
    this.validateExchangeRateField();
    this.validateClosePriceField();
    if (!this.form.valid) {
      return;
    }
    let title = this.form.get('title')?.value;
    let exchangeRate = this.form.get('exchangeRate')?.value;
    let closePrice = this.form.get('closePrice')?.value;
    let closeDate = this.form.get('closeDate')?.value;
    let bolivaresPrice = this.form.get('bolivaresPrice')?.value;
    let createDate = this.form.get('createDate')?.value;
    if (!title || !exchangeRate) {
      throw Error('Required fields');
    }
    this.isLoading = true;
    let priceRV = new PriceRV(title, exchangeRate, bolivaresPrice, closePrice, closeDate, createDate);
    this.priceRVService.createPriceRv(priceRV).subscribe((priceRV: PriceRV) => {
      this.isLoading = false;
      console.info('Did create PriceRV', priceRV);
      this.dismiss(priceRV);
    })
  }

  dismiss(priceRV?: PriceRV) {
    this.dialogRef.close(priceRV);
  }

  private createForm() {
    this.form = new FormGroup({
      title: new FormControl({ value: '', disabled: false }, [Validators.required]),
      exchangeRate: new FormControl({ value: '', disabled: false }, [Validators.required]),
      closePrice: new FormControl({ value: '', disabled: false }, [Validators.required]),
      closeDate: new FormControl({ value: '', disabled: false }, [Validators.required]),
      bolivaresPrice: new FormControl({ value: '', disabled: false }, [Validators.required]),
      createDate: new FormControl({ value: '', disabled: false }, [])
    })
  }

  /**
   * Valida la información que contiene el campo del titulo.
   */
  private validateTitleField() {
    this.validationMessages.name = [];
    const titleErrors = this.form.get('title')?.errors;
    console.log(titleErrors);
    if (titleErrors) {
      if (titleErrors.required) {
        // @ts-ignore
        this.validationMessages.name.push('El titulo es obligatorio');
      }
    }
  }

  /**
   * Valida la información que contiene el campo de contraseña.
   */
  private validateExchangeRateField() {
    this.validationMessages.name = [];
    const exchangeRateErrors = this.form.get('exchangeRate')?.errors;
    console.log(exchangeRateErrors);
    if (exchangeRateErrors) {
      if (exchangeRateErrors.required) {
        // @ts-ignore
        this.validationMessages.name.push('La tasa de cambio es obligatorio');
      }
    }
  }

  private validateClosePriceField() {
    this.validationMessages.name = [];
    const exchangeRateErrors = this.form.get('closePrice')?.errors;
    console.log(exchangeRateErrors);
    if (exchangeRateErrors) {
      if (exchangeRateErrors.required) {
        // @ts-ignore
        this.validationMessages.name.push('La tasa de cambio es obligatorio');
      }
    }
  }

}
