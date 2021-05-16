import { IStaff } from 'src/app/shared/models/staff.model';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { ApiService } from './../../../../shared/services/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import * as $ from "jquery";
import { HttpEventType } from '@angular/common/http';


@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.scss']
})
export class StaffComponent implements OnInit {
  public staffForm: FormGroup;
  public submitted: boolean = false;
  public staff: IStaff;
  public staffList: any[] = [];
  src: string;
  fileName: string = "Şəkil yüklə";
  file: File;
  positions: Array<any> = [
    { key: "doctor", val: "Həkim" },
    { key: "nurse", val: "Tibb bacısı" },
    { key: "other", val: "Digər" }];
  specs: Array<any>;
  constructor(private fb: FormBuilder,
    private apiService: ApiService,
    private notifierService: NotifierService) {

    this.apiService.getSpecs().subscribe(
      specs => {
        this.specs = specs;
        console.log(specs);
      }
    );


    this.staffForm = this.fb.group({
      fullname: ["", [Validators.required, Validators.maxLength(70)]],
      specialization: [null, Validators.required],
      position: [null, Validators.required],
      img: [""],
      phone: ["", [Validators.minLength(16), Validators.pattern('^((\\+994))?[0-9]{2} [0-9]{3} [0-9]{2} [0-9]{2}$')]],
      description: ["", [Validators.maxLength(150)]],
    })

  }

  ngOnInit(): void {
    this.apiService.getStaff().subscribe(
      staff => {
        console.log(staff);
        this.staffList = staff;
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
      },
      () => {
      }
    );

  }

  get f() {
    return this.staffForm.controls;
  }

  progressFile: any;
  formData = new FormData();
  public onSelectFile(file) {
    if (file.target.files.length > 0) {
      this.file = file.target.files[0];
      this.fileName = file.target.files[0].name;

      this.formData.append('file', this.file, this.file.name);
      this.apiService.uploadFile(this.formData).subscribe(
        resp => {
          console.log(resp);
          if (resp.type === HttpEventType.Response) {
            this.src = resp.body.src;
            $("#fileProgress").fadeOut();
          }

          if (resp.type === HttpEventType.UploadProgress) {
            this.progressFile =  Math.round(100 * resp.loaded / resp.total);
            $("#fileProgress").removeClass("d-none");
          }
        },
        err => {
          console.log(err);
        },
        () => {
        }
      )
    }

  }

  submit(add: boolean): void {
    this.submitted = true;
    if (this.staffForm.invalid) {
      return;
    }

    this.staff = {
      id: undefined,
      fullname: this.staffForm.value.fullname,
      position: this.staffForm.value.position,
      phone: this.staffForm.value.phone,
      specId: this.staffForm.value.specialization,
      description: this.staffForm.value.description,
      imgUrl: this.src,
      createdAt: new Date()
    }
    console.log(this.staff);


    if (add) {

      this.apiService.addStaff(this.staff).subscribe(
        user => {
          console.log(user);
          console.log(this.staff);

          this.notifierService.notify("success", `${this.staff.fullname} adlı işçi əlavə edildi.`);
        },
        err => {
          console.log(err);

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
        },
        () => {
        }
      )

    }
    else {
      this.staff.id = this.formStaffId;
      this.staff.imgUrl = this.src;
      this.apiService.editStaff(this.staff.id, this.staff).subscribe(
        user => {
          console.log(user);
          this.notifierService.notify("success", `${this.staff.fullname} adlı işçi yeniləndi.`);
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
        },
        () => {
        }
      )
    }

    $("#addForm").hide();
    this.staffForm.reset();
    window.location.reload();
    this.notifierService.notify("success", `${this.staff.fullname} adlı işçi əlavə edildi.`);

  }


  addForm: boolean;
  formTitle: string;
  formStaffId: number;
  submitBtn: string;

  showForm(add: boolean, staff) {

    if (add) {
      this.staffForm.reset();
      this.formTitle = "Yeni işçi əlavə et";
      this.addForm = true;
      this.submitBtn = "Əlavə et";
      this.fileName = "Şəkil yüklə";
    }
    else {
      this.formTitle = "Redaktə et";
      this.formStaffId = staff.id;
      this.staffForm.patchValue({
        fullname: staff.fullname,
        position: staff.position,
        specialization: staff.specId,
        description: staff.description,
        phone: staff.phone
      });
      this.fileName = staff.imgUrl;
      this.src = staff.imgUrl;
      this.addForm = false;
      this.submitBtn = "Yenilə";

    }

    if ($("#addForm").hasClass("d-none")) {
      this.closeForm();
    }

  }

  closeForm() {
    $("#addForm").toggleClass("col-5 d-none");
    $(".staff").toggleClass("col-7 col-12");

  }

  deleteStaff(staff: any, i: number) {

    let request = confirm('Əminsiniz mi?');
    if (!request) return;


    this.apiService.deleteStaff(staff.id).subscribe(
      res => {
        this.notifierService.notify('success', `${staff.fullname} adlı işçi silindi.`);
        this.staffList.splice(i, 1);
      }
    )
  }

}
