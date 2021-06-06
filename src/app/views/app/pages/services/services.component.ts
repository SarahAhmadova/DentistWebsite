import { NotifierService } from 'angular-notifier';
import { ApiService } from './../../../../shared/services/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { HttpEventType } from '@angular/common/http';
import { NgSelectConfig } from '@ng-select/ng-select';


@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {
  public submitted: boolean = false;
  public serviceForm: FormGroup;
  public serviceList: any[] = [];
  addForm: boolean;
  formTitle: string;
  formServiceId: number;
  submitBtn: string;
  fileName: string;
  src: string;
  progressFile: number;
  iconList = ["icon-teeth", "icon-teeth-1", "icon-teeth-2", "icon-tooth-2", "icon-tooth-3", "icon-dental", "icon-dentist", "flaticon-001-x-ray", "flaticon-002-tooth-7", "flaticon-003-toothache", "flaticon-004-dental-5", "flaticon-005-tooth-6", "flaticon-006-tooth-5", "flaticon-007-tooth-cleaning", "flaticon-008-white-teeth", "flaticon-010-smile", "flaticon-011-dental-care-3", "flaticon-012-tooth-4", "flaticon-013-tooth-3", "flaticon-014-dental-care-2", "flaticon-015-denture", "flaticon-018-dental-4", "flaticon-019-gum", "flaticon-020-dental-3", "flaticon-021-tooth-2", "flaticon-022-dental-care-1", "flaticon-023-dentist-1", "flaticon-024-dental-implant", "flaticon-025-dental-2", "flaticon-026-dental-1", "flaticon-027-dental", "flaticon-028-dentist", "flaticon-029-dental-care", "flaticon-030-tooth-1", "flaticon-031-broken-tooth", "flaticon-032-tooth", "flaticon-033-breath", "flaticon-034-bacteria", "flaticon-035-baby", "flaticon-036-anesthesia"];

  constructor(private fb: FormBuilder,
    private apiService: ApiService,
    private notifierService: NotifierService,
    private config: NgSelectConfig) {

    this.config.notFoundText = 'Custom not found';
    this.config.appendTo = 'body';
    this.config.bindValue = 'value';


    this.apiService.getServices().subscribe(
      arg => this.serviceList = arg);

    this.serviceForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(100)]],
      description: ['', [Validators.required, Validators.maxLength(500)]],
      icon: ['', [Validators.required]],
      imgPath: ['', [Validators.required]]
    })
  }

  ngOnInit(): void {
  }
  get f() {
    return this.serviceForm.controls;
  }

  file: File;
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
            this.progressFile = Math.round(100 * resp.loaded / resp.total);
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

  formType(add: boolean, service) {
    this.serviceForm.reset();
    $("label.active").removeClass("active");

    if (add) {
      this.serviceForm.reset();
      this.formTitle = "Yeni xidmət əlavə et";
      this.addForm = true;
      this.submitBtn = "Əlavə et";
      this.fileName = "Şəkil yüklə";

    }
    else {
      this.formTitle = "Redaktə et";
      this.formServiceId = service.id;
      this.serviceForm.patchValue({
        name: service.name,
        description: service.description
      });
      console.log(service.imgPath);

      this.serviceForm.value.imgPath = service.imgPath;
      console.log($(`.icon-option #${service.icon}`));
      $(`.icon-option #${service.icon}`).attr("checked", "true").parent("label").addClass("active");
      this.fileName = service.imgPath;
      this.src = service.imgPath;
      this.addForm = false;
      this.submitBtn = "Yenilə";

    }

  }


  deleteService(service: any, i: number) {

    let request = confirm('Əminsiniz mi?');
    if (!request) return;


    this.apiService.deleteService(service.id).subscribe(
      res => {
        this.notifierService.notify('success', `${service.name} adlı xidmət silindi.`);
        this.serviceList.splice(i, 1);
      }
    )
  }

  submit(): void {

    this.submitted = true;
    console.log("yesss");
    console.log(this.serviceForm.value.imgPath);

    // if (this.serviceForm.invalid) {
    //   return;
    // }
    console.log("yessssss");

    let service: any = {
      name: this.serviceForm.value.name,
      description: this.serviceForm.value.description,
      icon: $(".icon-option.active input").attr("id"),
      imgPath: this.src
    }

    console.log(this.serviceForm.value.imgPath);

    console.log(service.imgPath);
    if (this.addForm) {
      this.apiService.addService(service).subscribe(
        res => {
          this.notifierService.notify("success", `${res.name} xidməti əlavə edildi.`);
          window.location.reload();
        },
        err => {
          console.log(err);

        }
      )
    }

    if (!this.addForm) {

      this.apiService.updateService(this.formServiceId, service).subscribe(
        res => {
          console.log(res);
          this.notifierService.notify("success",`${res.name} xidməti yeniləndi.`);
          window.location.reload();
        },
        err => {
          console.log(err);
        }
      );
      window.location.reload();

    }

  }



}
