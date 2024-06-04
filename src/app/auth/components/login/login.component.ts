import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  form!: FormGroup;

  private _fb = inject(FormBuilder);
  private _authSvc = inject(AuthService);
  private _spinnerSvc = inject(NgxSpinnerService);

  ngOnInit(): void {
    this.form = this._fb.group({
      username: ['', { validators: [Validators.required] }],
      password: ['', { validators: [Validators.required] }],
    });
  }

  get username() {
    return this.form.get('username')!;
  }
  get password() {
    return this.form.get('password')!;
  }

  validate() {
    if (this.form.invalid) return;
    const user = this.username.value;
    const password = this.password.value;
    //console.log(user + password);
    this._spinnerSvc.show();
    this._authSvc.login(user, password).subscribe({
      error: () => {
        this._spinnerSvc.hide();
        this.showMessage('info', 'Credenciales Invalidas');
        this.form.reset();
      },
      complete: () => {
        this._spinnerSvc.hide();
      },
    });
  }

  private async showMessage(icon: SweetAlertIcon, text: string) {
    const Toast = Swal.mixin({
      //toast: true,
      //position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      backdrop: true,
      allowOutsideClick: false,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      },
    });
    await Toast.fire({
      icon,
      text: text ? text.toUpperCase() : text,
    });
  }
}
