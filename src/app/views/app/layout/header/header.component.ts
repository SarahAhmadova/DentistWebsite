import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { IUser } from './../../../../shared/models/user.model';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  user: IUser;
  constructor(public authService: AuthService) {
      this.authService.currentUser.subscribe(
        user=>{
          this.user = user
        }
      )
   }

  ngOnInit(): void {
  }
  
}
