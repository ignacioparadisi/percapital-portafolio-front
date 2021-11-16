import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ConstantType, TypeValue } from 'src/common/classes/ConstantType';
import { OperationService } from 'src/services/operation/operation.service';

@Component({
  selector: 'app-constant-value-form',
  templateUrl: './constant-value-form.component.html',
  styleUrls: ['./constant-value-form.component.scss']
})
export class ConstantValueFormComponent implements OnInit {

  isLoading = false;
  form: FormGroup;
  public validationMessages = {
    value: [],
    date: []
  };

  constructor(private operationService: OperationService, private dialogRef: MatDialogRef<ConstantValueFormComponent>) { 
  }

  ngOnInit(): void {
    this.createForm();
  }

  submit() {
    this.validateValueField();
    if (!this.form.valid) {
      return;
    }
    let value = this.form.get('value')?.value;
    if (!value) {
      throw Error('Required fields');
    }
    this.isLoading = true;
    let constantValue = new TypeValue();
    constantValue.value = value;
    constantValue.constantTypeId = ConstantType.COMISSION;
    this.operationService.createConstantValue(constantValue).subscribe(constantValue => {
      this.isLoading = false;
      console.info('Did create Exchange Rate', constantValue);
      this.dismiss(constantValue);
    })
  }

  dismiss(typeValue?: TypeValue) {
    this.dialogRef.close(typeValue);
  }

  private createForm() {
    this.form = new FormGroup({
      value: new FormControl({ value: '', disabled: false }, [Validators.required])
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
        this.validationMessages.value.push('La comisión es obligatoria.');
      }
    }
  }
}
