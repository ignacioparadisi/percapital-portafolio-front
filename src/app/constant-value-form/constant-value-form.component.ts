import {AfterViewInit, Component} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ConstantType, TypeValue } from 'src/common/classes/ConstantType';
import { OperationService } from 'src/services/operation/operation.service';
import {MatTableDataSource} from "@angular/material/table";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-constant-value-form',
  templateUrl: './constant-value-form.component.html',
  styleUrls: ['./constant-value-form.component.scss']
})
export class ConstantValueFormComponent implements AfterViewInit {

  isLoading = false;
  form: FormGroup;
  constantTypes: ConstantType[] = [];
  public validationMessages = {
    value: [],
    date: []
  };

  constructor(private operationService: OperationService,
              private dialogRef: MatDialogRef<ConstantValueFormComponent>,
              private toastr: ToastrService) {
    this.createForm();
  }

  ngAfterViewInit(): void {
    this.fetch();
  }

  fetch() {
    this.isLoading = true;
    this.operationService.getConstantTypes().subscribe(result => {
      this.isLoading = false;
      this.constantTypes = result;
      console.info('Did get Constant Types', result);
    }, error => {
      console.error(error);
      this.isLoading = false;
      this.toastr.error('Hubo un error al obtener los tipos de comisiones', 'Error');
    });
  }

  submit() {
    this.validateValueField();
    if (!this.form.valid) {
      return;
    }
    let value = this.form.get('value')?.value;
    let constantType = this.form.get('constantType')?.value;
    if (!value || !constantType) {
      throw Error('Required fields');
    }
    this.isLoading = true;
    let constantValue = new TypeValue();
    constantValue.value = value;
    constantValue.constantTypeId = constantType.id;
    this.operationService.createConstantValue(constantValue).subscribe(constantValue => {
      this.isLoading = false;
      console.info('Did create Constant Value', constantValue);
      this.toastr.success(`${constantType.name} se creó de manera exitosa`);
      this.dismiss(constantValue);
    }, error => {
      console.error(error);
      this.toastr.error(`Hubo un error al crear ${constantType.name}`, 'Error');
    });
  }

  dismiss(typeValue?: TypeValue) {
    this.dialogRef.close(typeValue);
  }

  private createForm() {
    this.form = new FormGroup({
      constantType: new FormControl({ value: '', disabled: false }, [Validators.required]),
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
