import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../app.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  user: string;
  errorMsg: string;
  loading: boolean = false;
  authData: string;
  constructor(private router: Router,  private appService: AppService, private cookie: CookieService) {
    
    this.fetchUserData();
   }

  ngOnInit() {
  }

  fetchUserData(){
    this.loading = true;
    this.appService.getAuthenticatedUser().subscribe((res: any)=>{
        this.loading = false;
        if(res.status == 200){
            this.authData = res.body.message;
        } else {
            this.errorMsg = 'User not Authenticated';
            this.router.navigate(['']);
        }
       
    }, err=>{
        this.loading = false;
        this.errorMsg = 'User not Authenticated';
        this.router.navigate(['']);
    })
}

  logout(){
    this.loading = true;
    this.appService.logoutRequest().subscribe((res: any)=>{
      this.loading = false;
      if(res.status == 200){
        this.router.navigate(['']);
      } else {
        this.errorMsg = 'Error in Logging Out';
      }
    }, err=>{
      this.loading = false;
      this.errorMsg = 'Error in Logging Out';
    })
   
  }

}
