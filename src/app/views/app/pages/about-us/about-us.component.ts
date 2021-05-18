import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from 'src/app/shared/services/api.service';
import { HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent implements OnInit {
  public aboutUs:FormGroup;
  public about:any;
  constructor(private apiService: ApiService,
              private fb: FormBuilder) {
                this.aboutUs = fb.group({
                  imgPath: [""],
                  title: [""]

                })
               }

  ngOnInit() {
  }

  fileName: string;
  src: string;
  progressFile: number;
  file: File;
  formData = new FormData();
  // public onSelectFile(file) {
  //   if (file.target.files.length > 0) {
  //     this.file = file.target.files[0];
  //     this.fileName = file.target.files[0].name;

  //     this.formData.append('file', this.file, this.file.name);
  //     this.apiService.uploadFile(this.formData).subscribe(
  //       resp => {
  //         console.log(resp);
  //         if (resp.type === HttpEventType.Response) {
  //           this.src = resp.body.src;
  //           $("#fileProgress").fadeOut();
  //         }

  //         if (resp.type === HttpEventType.UploadProgress) {
  //           this.progressFile = Math.round(100 * resp.loaded / resp.total);
  //           $("#fileProgress").removeClass("d-none");
  //         }
  //       },
  //       err => {
  //         console.log(err);
  //       },
  //       () => {
  //       }
  //     )
  //   }

  // }
}
