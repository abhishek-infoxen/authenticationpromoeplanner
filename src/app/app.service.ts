import { Injectable } from '@angular/core';
import { HttpClient, HttpParams} from '@angular/common/http';
const API_URL = 'https://authenticationpocepromo.azurewebsites.net/api/';
@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient) { }


  loginRequest(data){
    return this.http.post(API_URL+'Account/Login', data);
  }
}
