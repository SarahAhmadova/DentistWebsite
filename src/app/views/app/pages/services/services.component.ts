import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {
  public submitted: boolean = false;
  public serviceForm: FormGroup;

  constructor(private fb:FormBuilder) {
    this.serviceForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(100)]],
      
    })
   }

  ngOnInit(): void {
  }
  get f(){
    return this.serviceForm.controls;
  }

  submit(): void{
    this.submitted = true;
  }

}
