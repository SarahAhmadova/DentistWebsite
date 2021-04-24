import { IUser } from './../../../shared/models/user.model';
import { ApiService } from './../../../shared/services/api.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public submitted:boolean = false;
  public user:IUser;

  constructor(private fb: FormBuilder,
    private apiService: ApiService,
    private authService: AuthService,
    private router:Router,
    private notifierService:NotifierService) {
    this.formGenerate();

  }

  ngOnInit(): void {
  }

  private formGenerate() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email, Validators.maxLength(50)]],
      password: ['', [Validators.required]]
    })
  }

  get f() {
    return this.loginForm.controls;
  }

  submit(): void {
    this.submitted = true;

    if(this.loginForm.invalid){
      return;
    }
    console.log(this.loginForm.value);

    this.apiService.login(this.loginForm.value).subscribe(
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
        this.authService.login(this.user);
        this.router.navigate(['/app']);
        this.loginForm.reset();
      }
    )
  }
}
