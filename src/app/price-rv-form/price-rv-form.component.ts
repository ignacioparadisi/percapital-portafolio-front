import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ExchangeRate } from 'src/common/classes/ExchangeRate';
import { PriceRV } from 'src/common/classes/PriceRV';
import { StockTitle } from 'src/common/classes/StockTitle';
import { ExchangeRateService } from 'src/services/exchange-rate/exchange-rate.service';
import { PriceRvService } from 'src/services/price-rv/price-rv.service';
import { StockTitleService } from 'src/services/stock-title/stock-title.service';

@Component({
  selector: 'app-price-rv-form',
  templateUrl: './price-rv-form.component.html',
  styleUrls: ['./price-rv-form.component.scss']
})
export class PriceRvFormComponent implements OnInit {

  isLoading = false;
  form: FormGroup;

  private titles: StockTitle[] = [];
  private exchangeRate: ExchangeRate;
  filteredTitles?: Observable<StockTitle[]>;
  public validationMessages = {
    title: [],
    exchangeRate: [],
    closePrice: [],
    closeDate: [],
    bolivaresPrice: [],
    createDate: [],
  };

  constructor(private priceRVService: PriceRvService, private stockTitleService: StockTitleService, 
              private exchangeRateService: ExchangeRateService, private dialogRef: MatDialogRef<PriceRvFormComponent>) { 
  }

  ngOnInit(): void {
    this.createForm();
    this.fetchTitles();
    this.fetchLatestExchangeRate();
  }

  private fetchTitles() {
    this.stockTitleService.getTitles().subscribe(results => {
      this.titles = results.data ?? [];
      this.setupTitleFilter();
      console.log(results.data);
    }, error => {
      console.error(error);
    })
  }

  private fetchLatestExchangeRate() {
    this.exchangeRateService.getLatestExchangeRate().subscribe(results => {
      this.exchangeRate = results;
      this.form.get('exchangeRate')?.setValue(this.exchangeRate.value);
    }, error => {
      console.error(error);
    })
  }

  getOptionText(option?: StockTitle): string {
    return option && option.symbol && option.name ? `${option.symbol} | ${option.name}` : '';
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
    let priceRV = new PriceRV(title.id, this.exchangeRate.id, bolivaresPrice, closePrice, closeDate, createDate);
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
      exchangeRate: new FormControl({ value: '', disabled: true }, [Validators.required]),
      closePrice: new FormControl({ value: '', disabled: false }, [Validators.required]),
      closeDate: new FormControl({ value: (new Date()).toISOString(), disabled: false }, [Validators.required]),
      bolivaresPrice: new FormControl({ value: '', disabled: false }, [Validators.required]),
      createDate: new FormControl({ value: (new Date()).toISOString(), disabled: false }, [])
    })
  }

  /**
   * Valida la información que contiene el campo del titulo.
   */
  private validateTitleField() {
    this.validationMessages.title = [];
    const titleErrors = this.form.get('title')?.errors;
    console.log(titleErrors);
    if (titleErrors) {
      if (titleErrors.required) {
        // @ts-ignore
        this.validationMessages.title.push('El titulo es obligatorio');
      }
    }
  }

  /**
   * Valida la información que contiene el campo de contraseña.
   */
  private validateExchangeRateField() {
    this.validationMessages.exchangeRate = [];
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
    this.validationMessages.closePrice = [];
    const exchangeRateErrors = this.form.get('closePrice')?.errors;
    console.log(exchangeRateErrors);
    if (exchangeRateErrors) {
      if (exchangeRateErrors.required) {
        // @ts-ignore
        this.validationMessages.closePrice.push('El precio de cierre es obligatorio');
      }
    }
  }

}
