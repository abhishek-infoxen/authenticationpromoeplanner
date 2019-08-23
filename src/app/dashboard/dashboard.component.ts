import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  user: string;
  constructor(private router: Router) {
    this.user = localStorage.getItem('user');
   }

  ngOnInit() {
  }

  logout(){
    localStorage.removeItem('user');
    this.router.navigate(['']);
  }

}
