import { IEditSpec } from './../../../../shared/models/editSpec.model';
import { ISpeciality } from 'src/app/shared/models/speciality.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api.service';
import { NotifierService } from 'angular-notifier';


@Component({
  selector: 'app-specialities',
  templateUrl: './specialities.component.html',
  styleUrls: ['./specialities.component.scss']
})
export class SpecialitiesComponent implements OnInit {

  specForm: FormGroup;
  submitted: boolean = false;
  formTitle: string ;
  submitBtn: string ;
  specList: ISpeciality[] = [];
  specis:any[]=[];
  collectionSize: number;
  page = 1;
  pageSize = 4;

  constructor(private fb: FormBuilder,
    private apiService: ApiService,
    private notifierService: NotifierService) {

    this.specForm = this.fb.group({
      name: ["", [Validators.maxLength(100), Validators.required]]
    });

    this.apiService.getSpecs().subscribe(
      list => {
        this.specList = list;
        this.collectionSize = list.length;
        this.refreshAppointments();
      },
      err => {
        notifierService.notify("danger", err);
      }
    )
  }


  type: any = {
    add: "add",
    update: "edit"
  };
  formType: string;
  specId: number;
  get f() {
    return this.specForm.controls;
  }

  ngOnInit(): void {
  }

  refreshAppointments() {
    this.specis = this.specList
      .map((appointment, i) => ({ ind: i + 1, ...appointment }))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }
  showForm(typeVal: string, id: number) {
    this.specForm.reset();
    if (typeVal == "add") {
      this.formTitle = "İxtisas Əlavə et";
      this.submitBtn = "Əlavə et";
    }
    if (typeVal == "edit") {
      this.formTitle = "İxtisas Redaktə et";
      this.submitBtn = "Redaktə et";
      this.apiService.getSpec(id).subscribe(
        res => {
          this.specForm.patchValue({
            name: res.name
          });
          this.formSpecId = res.id;
          console.log(res);

        }
      )
    }
    this.specId = id;
    $("#specForm").fadeIn().removeClass("d-none");

    this.formType = typeVal;
  }

  speciality: ISpeciality;
  editSpec: IEditSpec;
  formSpecId:number;

  submit(type: string) {

    this.submitted = true;
    if (this.specForm.invalid) {
      return;
    }

    if (type == "add") {
      this.speciality = {
        id: undefined,
        name: this.specForm.value.name,
        createdAt: new Date()
      };
      this.apiService.addSpec(this.speciality).subscribe(
        spec => {
          console.log(spec);
          this.notifierService.notify("success", `${spec.name} ixtisası əlavə edildi.`);
          window.location.reload();
        },
        err => {
          switch (err.status) {
            case 400:
              let errors = err.error.errors;
              console.log("error");
              for (let key of Object.keys(errors)) {
                errors[key].forEach(e => {
                  this.notifierService.notify('error', e);
                });
              }
              break;
            case 404:
              this.notifierService.notify('error', err.error.message);
              break;
            default:
              console.log('unknown error');
              break;
          }
        }

      )
    }

    if(type == "edit") {
      this.editSpec = {
        name: this.specForm.value.name
      };
      console.log(this.editSpec);

      this.apiService.editSpec(this.formSpecId,this.editSpec).subscribe(
        spec => {
          console.log(spec);
          this.notifierService.notify("success", `${spec.name} ixtisası redakte edildi.`);
          window.location.reload();
        },
        err => {
          switch (err.status) {
            case 400:
              console.log("error");
              this.notifierService.notify('error', err.error.message);
              break;
            case 404:
              this.notifierService.notify('error', err.error.message);
              break;
            default:
              this.notifierService.notify('success', `${this.editSpec.name} ixtisası redakte edildi.`);
              console.log('unknown error');
              window.location.reload();

              break;
          }

        }

      )
    }


  }

  deleteSpec(spec: any, i: number) {
    let request = confirm('Əminsinizmi?');
    if (!request) return;

    this.apiService.deleteSpec(spec.id).subscribe(
      res => {
        this.notifierService.notify('success', `${spec.name} adlı ixtisas silindi.`);
        this.specList.splice(i, 1);
      }
    )
  }
}
