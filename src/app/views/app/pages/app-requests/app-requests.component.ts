import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'requests',
  templateUrl: './app-requests.component.html',
  styleUrls: ['./app-requests.component.scss']
})
export class AppRequestsComponent implements OnInit {
  appointmentForm: FormGroup;
  submitted: boolean = false;
  public appointments: any[] = [];
  public appoints: any[] = [];
  public doctors: any[] = [];
  collectionSize: number;
  page = 1;
  pageSize = 4;

  constructor(private apiService: ApiService,
    private notifierService: NotifierService,
    private fb: FormBuilder) {
    this.apiService.getAppointments().subscribe(
      res => {
        this.appointments = res;
        this.collectionSize = this.appointments.length;
        this.refreshAppointments();
      });

    this.appointmentForm = this.fb.group({
      patient: ["", [Validators.required]],
      phone: ["", [Validators.required]],
      service: ["", [Validators.required]],
      doctor: [null, [Validators.required]],
      time: ["", [Validators.required]],
      date: ["", [Validators.required]]
    });


  }

  
  refreshAppointments() {
    this.appoints = this.appointments
      .map((appointment, i) => ({ ind: i + 1, ...appointment }))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

  ngOnInit() {
    this.apiService.getStaff().subscribe(
      res=>{
        this.doctors = res.filter(d=>d.position == "doctor").map(d=>d.fullname);
        console.log(this.doctors);
      }
    );
  }

  get f() {
    return this.appointmentForm.controls;
  }
  formData: any;
  showForm(id: number) {    
    this.formData = this.appointments.find(e => e.id == id);
    console.log(this.appointments.find(e => e.id == id));
    this.appointmentForm.patchValue({
      patient: this.formData.patient,
      phone: this.formData.phone,
      service: this.formData.service,
      doctor: this.formData.doctor,
      time: this.formData.time,
      date: this.formData.date
    })
  }

  showAvailableTime(){
    $(".time-selector").slideToggle();
  }
  setTime(){
    this.time = `${this.hour}:${this.minute}`;
    console.log(this.time);
    $(".time-selector").slideUp();
    $("#timeInput").val(this.time);
  }
  hour:string="09";
  minute:string="00";
  time:string;

  public setHour(event){
    this.hour = event.target.value;

  }

  public setMinute(event){
    this.minute = event.target.value;
    
  }
  select(){
    console.log($("#doctorselect option:selected"));
    let _doctor = $("#doctorselect option:selected").val();
    console.log(this.appointments.filter(a=>a.doctor == _doctor));

    
  }
  appointment:any;
  submit() {
    this.appointment={
      patient: this.appointmentForm.value.patient,
      phone: this.appointmentForm.value.phone,
      service: this.appointmentForm.value.service,
      doctor: this.appointmentForm.value.doctor,
      time:   $("#timeInput").val(),
      date: this.appointmentForm.value.date
    }
    console.log("yessssss");
    console.log(this.appointment);
    
    this.submitted = true;
    if (this.appointmentForm.invalid) {
      return;
    }

    this.apiService.AddBaseAppointment(this.appointment).subscribe(
      res=>{
        this.notifierService.notify("success","Görüş uğurla əlavə edildi");
      },
      err=>{
        console.log(err);
      }
    )
  }

}
