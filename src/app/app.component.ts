import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet><notifier-container></notifier-container>'
})
export class AppComponent {
  title = 'medicAdmin';
}
