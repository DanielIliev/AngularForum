import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from './login.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { WINDOW } from 'src/app/utils/window.injectable';
import { LoginCredentials } from 'src/app/types/Auth';
import jwt from 'jwt-decode';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  errorMessage: string = '';
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private localStorageService: LocalStorageService,
    @Inject(WINDOW) private window: Window
  ) {}

  ngOnInit(): void {}

  login() {
    this.isLoading = true;

    if (this.loginForm.invalid) {
      this.errorMessage = 'The form you have submitted is invalid!';
      this.isLoading = false;
      return;
    }

    const credentials: LoginCredentials = this.loginForm.value;

    this.loginService.login(credentials).subscribe({
      next: (response) => {
        const token = String(response);
        const userData = jwt(token);
        this.localStorageService.set('authToken', token);
        this.localStorageService.set('userData', JSON.stringify(userData));
        this.errorMessage = '';
        this.isLoading = false;
      },
      error: (err) => {
        if (err.error.message) {
          this.errorMessage = err.error.message;
        } else {
          this.errorMessage =
            'We are unable to log you in, please try again later';
        }
        this.isLoading = false;
      },
      complete: () => {
        this.window.location.reload();
      },
    });
  }
}
