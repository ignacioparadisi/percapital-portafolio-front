import { Component, OnInit } from '@angular/core';
import { StockTitle } from 'src/common/classes/StockTitle';
import { StockTitleService } from 'src/services/stock-title/stock-title.service';
import { MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-title-form',
  templateUrl: './title-form.component.html',
  styleUrls: ['./title-form.component.scss']
})
export class TitleFormComponent implements OnInit {

  isLoading = false;
  titleForm: FormGroup;
  public validationMessages = {
    name: [],
    symbol: []
  };

  constructor(private stockTitleService: StockTitleService, private dialogRef: MatDialogRef<TitleFormComponent>) { 
  }

  ngOnInit(): void {
    this.createForm();
  }

  submit() {
    this.validateNameField();
    this.validateSymbolField();
    if (!this.titleForm.valid) {
      return;
    }
    let name = this.titleForm.get('name')?.value;
    let symbol = this.titleForm.get('symbol')?.value;
    if (!name || !symbol) {
      throw Error('Required fields');
    }
    this.isLoading = true;
    let stockTitle = new StockTitle(name, symbol);
    this.stockTitleService.createTitle(stockTitle).subscribe((title: StockTitle) => {
      this.isLoading = false;
      console.info('Did create Stock Title', title);
      this.dismiss(title);
    })
  }

  dismiss(title?: StockTitle) {
    this.dialogRef.close({ title });
  }

  private createForm() {
    this.titleForm = new FormGroup({
      name: new FormControl({ value: '', disabled: false }, [Validators.required]),
      symbol: new FormControl({ value: '', disabled: false }, [Validators.required])
    })
  }

  /**
   * Valida la información que contiene el campo de email.
   */
   private validateNameField() {
    this.validationMessages.name = [];
    const nameErrors = this.titleForm.get('name')?.errors;
    console.log(nameErrors);
    if (nameErrors) {
      if (nameErrors.required) {
        // @ts-ignore
        this.validationMessages.name.push('El nombre es obligatorio');
      }
    }
  }

  /**
   * Valida la información que contiene el campo de contraseña.
   */
  private validateSymbolField() {
    this.validationMessages.symbol = [];
    const symbolErrors = this.titleForm.get('symbol')?.errors;
    if (symbolErrors) {
      if (symbolErrors.required) {
        // @ts-ignore
        this.validationMessages.symbol.push('El simbolo es obligatorio.');
      }
    }
  }

}
