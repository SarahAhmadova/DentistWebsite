import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {
  public recoverForm:FormGroup;
  public submitted:boolean = false;
  constructor(private fb:FormBuilder) {
    this.generateForm();
   }

  ngOnInit(): void {
  }

  public generateForm(){
    this.recoverForm = this.fb.group({
      email: ['',[Validators.required, Validators.email]]
    })
  }

  submit(): void {
    this.submitted = true;

    if (this.recoverForm.invalid) {
      return;
    }
  }
}
