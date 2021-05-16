import { IEditSpec } from './../../../../shared/models/editSpec.model';
import { ISpeciality } from 'src/app/shared/models/speciality.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api.service';
import { NotifierService } from 'angular-notifier';
import { Observable } from 'rxjs';
import { NgbdSortableHeader, SortEvent } from 'src/app/views/app/pages/specialities/sortable.directive';
import { specService } from 'src/app/shared/services/specService.service';
import { DatePipe, DecimalPipe } from '@angular/common';


@Component({
  selector: 'app-specialities',
  templateUrl: './specialities.component.html',
  styleUrls: ['./specialities.component.scss'],
  providers: [specService, DecimalPipe, DatePipe]
})
export class SpecialitiesComponent implements OnInit {

  specForm: FormGroup;
  submitted: boolean = false;
  formTitle: string ;
  submitBtn: string ;
  specList: ISpeciality[] = [];

  specs$: Observable<ISpeciality[]>;
  total$: Observable<number>;
  constructor(private fb: FormBuilder,
    private apiService: ApiService,
    private notifierService: NotifierService,
    public service: specService) {

    this.specForm = this.fb.group({
      name: ["", [Validators.maxLength(100), Validators.required]]
    });

    this.apiService.getSpecs().subscribe(
      list => {
        this.specList = list;
        console.log(list);

      },
      err => {
        notifierService.notify("danger", err);
      }
    )
  }

  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

  onSort({ column, direction }: SortEvent) {
    // resetting other headers
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    this.service.sortColumn = column;
    this.service.sortDirection = direction;
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
    console.log();


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
