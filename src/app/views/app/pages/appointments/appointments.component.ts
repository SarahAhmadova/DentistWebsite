import { ApiService } from 'src/app/shared/services/api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.scss']
})
export class AppointmentsComponent implements OnInit {

  appointments:any[]=[];
  appoints:any[]=[];
  collectionSize: number;
  page = 1;
  pageSize = 4;
  doctors:any[]=[];
  constructor(private apiService: ApiService) {
    this.apiService.getBaseAppointments().subscribe(
      res=>{
        this.appointments = res;

        // console.log(this.appointments);

        this.collectionSize = this.appointments.length;
        this.refreshAppointments();
      }
    );
  }

  refreshAppointments() {
    this.appoints = this.appointments
      .map((appointment, i) => ({ ind: i + 1, ...appointment }))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

  
// mapped:any[];
  ngOnInit() {
    this.apiService.getStaff().subscribe(
      res=>{
        this.doctors = res;
        //  this.mapped =  this.appointments.map(d=>d.doctorId = this.doctors.find(doc=> doc.id = d.id));
      }
    )


  }

}
