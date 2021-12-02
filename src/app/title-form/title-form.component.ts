import { Component, OnInit } from '@angular/core';
import { StockTitle } from 'src/common/classes/StockTitle';
import { StockTitleService } from 'src/services/stock-title/stock-title.service';
import { MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, PatternValidator, Validators } from '@angular/forms';
import {ToastrService} from "ngx-toastr";

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
    symbol: [],
    isinCode: []
  };

  constructor(private stockTitleService: StockTitleService,
              private dialogRef: MatDialogRef<TitleFormComponent>,
              private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.createForm();
  }

  submit() {
    this.validateNameField();
    this.validateSymbolField();
    this.validateIsinCodeField();
    if (!this.titleForm.valid) {
      return;
    }
    let name = this.titleForm.get('name')?.value;
    let symbol = this.titleForm.get('symbol')?.value;
    let isinCode = this.titleForm.get('isinCode')?.value;
    if (!name || !symbol || !isinCode) {
      throw Error('Required fields');
    }
    this.isLoading = true;
    let stockTitle = new StockTitle(name, symbol, isinCode);
    this.stockTitleService.createTitle(stockTitle).subscribe((title: StockTitle) => {
      this.isLoading = false;
      console.info('Did create Stock Title', title);
      this.toastr.success(`${title.name} fue creado de manera exitosa`);
      this.dismiss(title);
    }, error => {
      console.error(error);
      this.toastr.error('Hubo un error al crear el título');
    })
  }

  dismiss(title?: StockTitle) {
    this.dialogRef.close(title);
  }

  private createForm() {
    this.titleForm = new FormGroup({
      name: new FormControl({ value: '', disabled: false }, [Validators.required]),
      symbol: new FormControl({ value: '', disabled: false }, [Validators.required]),
      isinCode: new FormControl({ value: '', disabled: false }, [Validators.required,
        Validators.pattern('[a-zA-Z0-9]{12}')])
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

  private validateIsinCodeField() {
    this.validationMessages.isinCode = [];
    const isinCodeErrors = this.titleForm.get('isinCode')?.errors;
    if (isinCodeErrors) {
      console.log(isinCodeErrors);
      if (isinCodeErrors.required) {
        // @ts-ignore
        this.validationMessages.isinCode.push('El código es obligatorio.');
      }

      if (isinCodeErrors.pattern) {
        // @ts-ignore
        this.validationMessages.isinCode.push('El código ISIN es inválido.');
      }
    }
  }
}
