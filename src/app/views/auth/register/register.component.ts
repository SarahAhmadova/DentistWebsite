import { IUserRegister } from './../../../shared/models/register.model';
import { IUser } from './../../../shared/models/user.model';
import { Router } from '@angular/router';
import { ApiService } from './../../../shared/services/api.service';
import { AuthService } from './../../../shared/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public registerForm: FormGroup;
  public submitted:boolean = false;
  public user: IUser;
  private registerUser: IUserRegister;

  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private apiService: ApiService,
    private router: Router,
    private notifierService: NotifierService) { }

  ngOnInit(): void {
    this.formGenerate();
  }

  private formGenerate() {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(30)]],
      surname: ['', [Validators.required, Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(50)]],
      password: ['', [Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{6,}$'),Validators.required, Validators.maxLength(30),Validators.minLength(6)]],
      confirmPassword: ['']
    })
  }

  get f() {
    return this.registerForm.controls;
  }

  submit(): void {
    this.submitted = true;

    if (this.registerForm.get('password').value != this.registerForm.get('confirmPassword').value) {
      this.registerForm.get("confirmPassword").setErrors({ 'notsame': true });
      return;
    }

    if (this.registerForm.invalid) {
      return;
    }

    this.registerUser = {
      fullname: `${this.registerForm.value.name} ${this.registerForm.value.surname}`,
      email: this.registerForm.value.email,
      password: this.registerForm.value.password
    }

    this.apiService.register(this.registerUser).subscribe(
      user=>{
        this.user = user;
      },
      err => {
        switch (err.status) {
          case 400:
            let errors = err.error.errors;
            console.log("error");
            for (let key of Object.keys(errors)) {
                errors[key].forEach(e => {
                  this.notifierService.notify('error',e);
                });
            }
            break;
          case 404:
            this.notifierService.notify('error',err.error.message);
            break;
          default:
            console.log('unknown error');
            break;
        }
      },
      () => {
        this.authService.register(this.user);
        this.router.navigate(['/auth/login']);
        this.registerForm.reset();
      }
    )
  }

}
