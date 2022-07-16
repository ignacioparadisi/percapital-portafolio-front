import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthGuard } from 'src/resources/auth-guard';
// import { UserService } from 'src/services/user.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import {User} from "../../common/classes/User";
import { UserService } from 'src/services/user/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  /**
   * Variable privada para guardar el valor de inicio de sesión cargando.
   * Esta variable solo puede ser asignada desde la funcion `set isLoading(isLoading: boolean)`
   */
  private _isLoading = false;
  /**
   * Al momento de asignar el valor de carga a la variable publica, se actualiza el UI.
   */
  set isLoading(isLoading: boolean) {
    this._isLoading = isLoading;
    this.updateUI(isLoading);
  }
  /**
   * Se retorna el valor que esta guardado en la variable privada.
   */
  get isLoading(): boolean { return this._isLoading };
  public validationMessages: any = {
    name: [],
    email: [],
    password: [],
    validPassword: []
  };
  public hideValidPassword = true;
  public hidePassword = true;
  public maxDate = new Date();
  public registerForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.required]),
    validPassword: new FormControl('', [Validators.required])
  });

  constructor(
    private userService: UserService,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<RegisterComponent>) { }

  ngOnInit(): void {
  }

  dismiss() {
    this.dialogRef.close();
  }

  /**
   * Presenta una alerta de error
   */
  async presentErrorAlert(error: any) {
    var message = 'Error al crear el usuario.';
    console.log(error);
    if (error.message && error.message.includes('email')) {
      this.validationMessages.email.push(error.message);
      this.registerForm.get('email')?.setErrors({ incorrect: true} );
    }
    this.snackBar.open(error.message ? error.message : message, 'Cerrar', {
      duration: 5000
    });
  }

  /**
   * Se validan los campos y se envian los datos al servidor para ser creado el usuario.
   */
  createAccount() {
    this.clearValidationMessages();
    this.validateFields();
    if (this.registerForm.valid) {
      const formData = {
        full_name: this.registerForm.get('name')?.value,
        email: this.registerForm.get('email')?.value,
        password: this.registerForm.get('password')?.value,
        validPassword: this.registerForm.get('validPassword')?.value,
      };
      const user = new User(formData.full_name, formData.email, formData.password)
      this.isLoading = true;
      this.userService.register(user).subscribe(result => {
        this.isLoading = false;
        this.dismiss();
        AuthGuard.saveUser(result);
        this.snackBar.open('Cuenta creada safistactoriamente.', undefined, {
          duration: 3000
        });
        this.router.navigate(['/portfolio']);
      }, error => {
        this.isLoading = false;
        console.error(error);
        this.presentErrorAlert(error);
      });
    }
  }

  private updateUI(isLoading: boolean) {
    if (isLoading) {
      this.registerForm.disable();
    } else {
      this.registerForm.enable();
    }
  }

  /**
   * Limpia los mensajes de error.
   */
  private clearValidationMessages() {
    this.validationMessages.name = [];
    this.validationMessages.email = [];
    this.validationMessages.password = [];
    this.validationMessages.validPassword = [];
  }

  /**
   * Valida que los campos tengan información válida.
   */
  private validateFields() {
    this.validateEmailField();
    this.validateNameField();
    this.validatePasswordField();
  }

  /**
   * Valida la información que contiene el campo de email.
   */
  private validateEmailField() {
    const emailErrors = this.registerForm.get('email')?.errors;
    if (emailErrors) {
      if (emailErrors.required) {
        this.validationMessages.email.push('El correo electrónico es obligatorio.');
      }
      if (emailErrors.email) {
        this.validationMessages.email.push('El formato del correo electrónico no es válido.');
      }
    }
  }

  /**
   * Valida la información que contiene el campo de nombre.
   */
  private validateNameField() {
    const nameErrors = this.registerForm.get('name')?.errors;
    if (nameErrors) {
      if (nameErrors.required) {
        this.validationMessages.name.push('El nombre es obligatorio.');
      }
    }
  }

  /**
   * Valida la información que contiene el campo de contraseña.
   */
  private validatePasswordField() {
    const passwordErrors = this.registerForm.get('password')?.errors;
    const validPasswordErrors = this.registerForm.get('validPassword')?.errors;

    if (!passwordErrors && !validPasswordErrors) {
      if (this.registerForm.get('password')?.value !== this.registerForm.get('validPassword')?.value) {
        this.validationMessages.password.push('Las contraseñas no coinciden');
        this.validationMessages.validPassword.push('Las contraseñas no coinciden');
        this.registerForm.get('password')?.setErrors({ incorrect: true} )
        this.registerForm.get('validPassword')?.setErrors({ incorrect: true} )
      }
    }
    if (passwordErrors) {
      if (passwordErrors.required) {
        this.validationMessages.password.push('La contraseña es obligatorio.');
      }
    }
    if (validPasswordErrors) {
      if (validPasswordErrors.required) {
        this.validationMessages.validPassword.push('La comprobación de la contraseña es obligatorio.');
      }
    }
  }

}
