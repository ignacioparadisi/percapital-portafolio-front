import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ExchangeRate } from 'src/common/classes/ExchangeRate';
import { ExchangeRateService } from 'src/services/exchange-rate/exchange-rate.service';
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-exchange-rate-form',
  templateUrl: './exchange-rate-form.component.html',
  styleUrls: ['./exchange-rate-form.component.scss']
})
export class ExchangeRateFormComponent implements OnInit {

  isLoading = false;
  form: FormGroup;
  public validationMessages = {
    value: [],
    date: []
  };

  constructor(private exchangeRateService: ExchangeRateService,
              private dialogRef: MatDialogRef<ExchangeRateFormComponent>,
              private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.createForm();
  }

  submit() {
    this.validateValueField();
    this.validateDateField();
    if (!this.form.valid) {
      return;
    }
    let value = this.form.get('value')?.value;
    let date = this.form.get('date')?.value;
    if (!value) {
      throw Error('Required fields');
    }
    if (!date) {
      throw Error('Required fields');
    }
    this.isLoading = true;
    let exchangeRate = new ExchangeRate(value, date);
    this.exchangeRateService.createExchangeRate(exchangeRate).subscribe(exchangeRate => {
      this.isLoading = false;
      console.info('Did create Exchange Rate', exchangeRate);
      this.dismiss(exchangeRate);
      this.toastr.success(`La tasa de cambio ${exchangeRate.value} se creó de manera exitosa`);
    }, error => {
      console.error(error);
      this.toastr.error('Hubo un error al crear la tasa de cambio', 'Error');
    })
  }

  dismiss(exchangeRate?: ExchangeRate) {
    this.dialogRef.close(exchangeRate);
  }

  private createForm() {
    this.form = new FormGroup({
      value: new FormControl({ value: '', disabled: false }, [Validators.required]),
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

}
