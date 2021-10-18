import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Operation } from 'src/common/classes/Operation';
import { StockTitle } from 'src/common/classes/StockTitle';
import { OperationService } from 'src/services/operation/operation.service';
import { StockTitleService } from 'src/services/stock-title/stock-title.service';

@Component({
  selector: 'app-operation-form',
  templateUrl: './operation-form.component.html',
  styleUrls: ['./operation-form.component.scss']
})
export class OperationFormComponent implements OnInit {
  @Input() typeId: number;

  isLoading = false;
  form: FormGroup;
  private titles: StockTitle[] = [];
  filteredTitles?: Observable<StockTitle[]>;
  public validationMessages = {
    value: [],
    date: []
  };

  constructor(private operationService: OperationService, private stockTitleService: StockTitleService, private dialogRef: MatDialogRef<OperationFormComponent>) { 
  }

  ngOnInit(): void {
    this.createForm();
    this.fetchTitles();
  }

  private fetchTitles() {
    this.stockTitleService.getTitles().subscribe(results => {
      this.titles = results.data;
      this.setupFilter();
      console.log(results.data);
    }, error => {
      console.error(error);
    })
  }

  getOptionText(option?: StockTitle): string {
    return option && option.symbol && option.name ? `${option.symbol} | ${option.name}` : '';
  }

  private setupFilter() {
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
  }

  dismiss(exchangeRate?: Operation) {
    this.dialogRef.close(exchangeRate);
  }

  private createForm() {
    this.form = new FormGroup({
      title: new FormControl({ }, [Validators.required]),
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
