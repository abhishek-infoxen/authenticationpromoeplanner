
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AppService } from '../app.service';

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
        private appService: AppService
    ) {
        // // redirect to home if already logged in
        // if (this.authenticationService.currentUserValue) { 
        //     this.router.navigate(['/']);
        // }
    }

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
            if(res.status == 200){
                localStorage.setItem('user', res.data);
                this.router.navigate(['/dashboard']);
            } else {
                this.loading = false;
                localStorage.removeItem('user');
                this.errorMsg = res.message;
            }
        }, err=>{
            this.loading =  false;
            localStorage.removeItem('user');
            console.log("error");
        })

       
    //     this.authenticationService.login(this.f.username.value, this.f.password.value)
    //         .pipe(first())
    //         .subscribe(
    //             data => {
    //                 this.router.navigate([this.returnUrl]);
    //             },
    //             error => {
    //                 this.alertService.error(error);
    //                 this.loading = false;
    //             });
    // }


}
}

