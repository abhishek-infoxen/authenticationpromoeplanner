import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders} from '@angular/common/http';
import { environment } from 'src/environments/environment';
const API_URL = environment.base_url;
//const API_URL = 'http://localhost:57435/api/';
@Injectable({
  providedIn: 'root'
})
export class AppService {

  authData: string;

  constructor(private http: HttpClient) { }


  loginRequest(data){
   let options = {
       withCredentials: true, observe: 'response' as 'response'
   }
    return this.http.post(API_URL+'Account/Login', data, options);
  }

  logoutRequest(){
    return this.http.post(API_URL+'Account/Logout', ''); 
  }

  getAuthenticatedUser(){
   let options = {
     withCredentials: true, observe: 'response' as 'response'
   }
    return this.http.get(API_URL+'Data/DataForAuthenticatedUser', options);
  }

}
