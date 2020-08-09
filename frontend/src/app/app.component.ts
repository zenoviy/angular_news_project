import { Component, OnInit } from '@angular/core';
import { AppServDataService } from './loginServ/app-serv-data.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  pageLoad: boolean ;
  constructor(private loginService: AppServDataService, private router: Router){
    this.pageLoad = this.loginService.pageLoad;
  }

  loginButton() {
    this.loginService.formActive = !this.loginService.formActive;
  }

  ngOnInit() {
  }
}
