import { AuthService } from './../services/auth.service';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/internal/operators';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private router: Router,
              private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let header = {
      key: "",
      value: ""
  }

  let modifiedReq = req.clone();

  if(this.authService.currentUserValue!=null){
      header.key = 'Authorization';
      header.value = this.authService.currentUserValue.token;

      modifiedReq = req.clone({
          headers: req.headers.set(header.key, header.value)
      });
  }


  return next.handle(modifiedReq).pipe(
      catchError((err, caught: Observable<HttpEvent<any>>) => {
          if (err instanceof HttpErrorResponse && err.status == 401) {
              this.router.navigate(['auth/login'], { queryParams: { returnUrl: req.url } });
              return of(err as any);
          }
          throw err;
      })
  );
  }
}
