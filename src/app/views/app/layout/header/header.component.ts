import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { IUser } from './../../../../shared/models/user.model';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  user: IUser;
  appointments: any[] = [];
  accepted:any[]=[];
  constructor(public authService: AuthService,
              apiService: ApiService) {
    apiService.getAppointments().subscribe(
      res=>{
        this.appointments = res;
        console.log(res);
        console.log(this.appointments);
        this.accepted = this.appointments.filter(e=>!e.accepted);
        console.log(this.accepted);
      },
      err=>{
        console.log(err);
      }
    )
      this.authService.currentUser.subscribe(
        user=>{
          this.user = user
        }
      )
   }

  ngOnInit(): void {
    
  }
  
}
