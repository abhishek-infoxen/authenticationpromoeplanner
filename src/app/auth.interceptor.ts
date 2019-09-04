import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppService } from './app.service';
import { catchError,tap} from 'rxjs/operators';
import { Router } from '@angular/router';
//import { AuthService } from './auth/auth.service';
//import { Observable } from 'rxjs/Observable';
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(public appService: AppService, private router: Router) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    // modify request
    request = request.clone({
      setHeaders: {
        'Content-Type': 'application/json',
       'Access-Control-Allow-Origin': '*'
        //Authorization: `Bearer ${localStorage.getItem('MY_TOKEN')}`
      }
    });

    return next.handle(request)
    .pipe(
        tap(event => {
          if (event instanceof HttpResponse) {
             
            console.log(" all looks good");
            // http response status code
            console.log(event.status);
          }
        }, error => {
         // http response status code
            console.log("----response----");
            console.error("status code:");
            console.error(error.status);
            console.error(error.message);
            this.router.navigate(['']);
            console.log("--- end of response---");
           

        })
      )
  }
}

//`Bearer ${this.auth.getToken()}`