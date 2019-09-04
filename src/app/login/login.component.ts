
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppService } from '../app.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    errorMsg: string;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private appService: AppService,
        private cookieService: CookieService
    ) { }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });

        // get return url from route parameters or default to '/'
        //this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }
        console.log("login", this.loginForm.value);
        this.loading = true;
        let loginData = {
            UserID: this.loginForm.value.username,
            Password: this.loginForm.value.password
        }
        this.appService.loginRequest(loginData).subscribe((res: any)=>{
            this.loading = false;
            if(res.status == 200){
                this.router.navigate(['/dashboard']);
               // this.fetchUserData();
               
            } else {
               
                this.errorMsg = res.message;
            }
        }, err=>{
            this.loading =  false;
            
            console.log("error");
        })


}

fetchUserData(){
    this.loading = true;
    this.appService.getAuthenticatedUser().subscribe((res: any)=>{
        this.loading = false;
        if(res.status == 200){
           
            this.appService.authData = res.message;
        } else {
            this.errorMsg = 'User not Authenticated';
        }
       
    }, err=>{
        this.loading = false;
        this.errorMsg = 'User not Authenticated';
    })
}
}

