import { IStaff } from 'src/app/shared/models/staff.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IUser } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  public login(data: any): Observable<IUser> {
    return this.http.post<IUser>(`${environment.baseUrl}/v1/auth/login`, data)
  }

  public register(data: any): Observable<IUser> {
    return this.http.post<IUser>(`${environment.baseUrl}/v1/auth/register`, data)
  }

  public addStaff(data: any) : Observable<IStaff>{
    return this.http.post<IStaff>(`${environment.baseUrl}/v1/staff`, data)
  }

}
