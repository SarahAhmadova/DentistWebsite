import { NotifierService } from 'angular-notifier';
import { ApiService } from './../../../../shared/services/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { IStaff } from 'src/app/shared/models/staff.model';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.scss']
})
export class StaffComponent implements OnInit {
  public staffForm: FormGroup;
  public submitted: boolean = false;
  public staff: IStaff;
  positions:Array<Object> = [
    {key:"doctor",val: "Həkim"},
    {key: "nurse", val: "Tibb bacısı"},
    {key: "staff", val: "Digər"}];

  constructor(private fb:FormBuilder,
              private apiService: ApiService,
              private notifierService: NotifierService) {

    this.staffForm = this.fb.group({
      fullname: ["",[Validators.required, Validators.maxLength(70)]],
      speciality: ["", [Validators.required, Validators.maxLength(50)]],
      position: [null, Validators.required],
      img: [""],
      phone: ["", [Validators.minLength(16), Validators.pattern('^((\\+994))?[0-9]{2} [0-9]{3} [0-9]{2} [0-9]{2}$')]],
      details: ["",[Validators.maxLength(150)]],
    })
   }

  ngOnInit(): void {
  }

  get f(){
    return this.staffForm.controls;
  }


  submit(): void{
    this.submitted=true;

    if(this.staffForm.invalid){
      return;
    }

    this.staff = {
      fullname: this.staffForm.value.fullname,
      position: this.staffForm.value.position,
      phone: this.staffForm.value.phone,
      specialization: this.staffForm.value.speciality,
      description: this.staffForm.value.details,
      imgUrl: this.staffForm.value.img,
    }

    console.log(this.staffForm.value);

    this.apiService.addStaff(this.staff).subscribe(
      user=>{
        console.log(user);

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
      }
    )
    this.staffForm.reset();

  }
}
