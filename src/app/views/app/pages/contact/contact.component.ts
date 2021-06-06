import { IContact } from './../../../../shared/models/contact.model';
import { ApiService } from 'src/app/shared/services/api.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  public contactForm: FormGroup;
  public submitted: boolean = false;
  public contact: any;
  public contactData: IContact;
  constructor(private fb: FormBuilder,
    private api: ApiService) {
    api.getContact().subscribe(
      res => {
        this.contact = res;
        console.log(this.contact);

      },
      err => {
        console.log(err);

      }
    );
    this.contactForm = this.fb.group({
      phone1: ["", [Validators.required, Validators.minLength(14)]],
      phone2: ["", [Validators.required, Validators.minLength(14)]],
      address: ["", [Validators.required, Validators.minLength(10)]],
      email: ["", [Validators.required, Validators.email]]
    })
  }

  ngOnInit() {
    console.log(this.contact);

  }

  public get f() {
    return this.contactForm.controls;
  }

  addData() {
    this.submitted = true;
    if (this.contactForm.invalid) {
      return;
    }
    if (this.contact) {
      this.contactData = {
        address: this.contactForm.value.address,
        phone1: this.contactForm.value.phone1,
        phone2: this.contactForm.value.phone2,
        email: this.contactForm.value.email
      }
      this.api.updateContact(this.contactData).subscribe(
        res => {
          console.log("success updatee");
        },
        err => {
          console.log(err);
        }
      )
    }
    else {
      console.log(this.contactForm.value);

      this.api.addContact(this.contactForm.value).subscribe(
        res => {
          console.log("success");
          window.location.reload();
        }
      )
    }
    window.location.reload();

  }

  fillForm(){
    this.contactForm.patchValue({
      address: this.contact.address,
      phone1: this.contact.phone1,
      phone2: this.contact.phone2,
      email: this.contact.email
    });
  }
}
