import { IStaff } from 'src/app/shared/models/staff.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IUser } from '../models/user.model';
import { ISpeciality } from '../models/speciality.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }


  // =================== SIGN IN & SIGN UP ===================
  public login(data: any): Observable<IUser> {
    return this.http.post<IUser>(`${environment.baseUrl}/auth/login`, data)
  }

  public register(data: any): Observable<IUser> {
    return this.http.post<IUser>(`${environment.baseUrl}/auth/register`, data)
  }


  // =================== FILE UPLOAD ===================
  public uploadFile(file:any){
    return this.http.post<any>(`${environment.baseUrl}/upload`, file,{ reportProgress: true, observe: 'events' });
  }

  // =================== STAFF ===================
  //#region Staff

  public getStaff():Observable<any[]> {
    return this.http.get<any[]>(`${environment.baseUrl}/staff`);
  }

  public addStaff(data: any):Observable<IStaff> {
    return this.http.post<IStaff>(`${environment.baseUrl}/staff`, data)
  }

  public editStaff(id:number,data: any): Observable<any>{
    return this.http.put<any>(`${environment.baseUrl}/staff/${id}`, data)
  }

  public deleteStaff(id: number): Observable<any>{
    return this.http.delete<any>(`${environment.baseUrl}/staff/${id}`)
  }

//#endregion Staff


  // =================== SPECIALITIES ===================
  //#region Specialities
  public getSpec(id:number):Observable<ISpeciality> {
    return this.http.get<ISpeciality>(`${environment.baseUrl}/specialities/${id}`);
  }

  public getSpecs():Observable<ISpeciality[]> {
    return this.http.get<ISpeciality[]>(`${environment.baseUrl}/specialities`);
  }

  public addSpec(data: any):Observable<ISpeciality> {
    return this.http.post<ISpeciality>(`${environment.baseUrl}/specialities`, data)
  }

  public editSpec(id:number,data: any): Observable<any>{
    return this.http.put<any>(`${environment.baseUrl}/specialities/${id}`, data)
  }

  public deleteSpec(id: number): Observable<any>{
    return this.http.delete<any>(`${environment.baseUrl}/specialities/${id}`)
  }
  //#endregion Staff

  // =================== SERVICES ===================
  //#region Services
  public getServices():Observable<any[]> {
    return this.http.get<any[]>(`${environment.baseUrl}/services`);
  }
  public addService(data : any):Observable<any>{
    return this.http.post<any>(`${environment.baseUrl}/services`,data);
  }
  public updateService(id:number, data : any):Observable<any>{
    return this.http.put<any>(`${environment.baseUrl}/services/${id}`,data);
  }
  public deleteService(id: number): Observable<any>{
    return this.http.delete<any>(`${environment.baseUrl}/services/${id}`)
  }
   //#endregion Services



  }
