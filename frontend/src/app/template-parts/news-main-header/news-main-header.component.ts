import { Component, OnInit } from '@angular/core';
import { AppServDataService } from '../../loginServ/app-serv-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-news-main-header',
  templateUrl: './news-main-header.component.html',
  styleUrls: ['./news-main-header.component.css']
})
export class NewsMainHeaderComponent implements OnInit {
  pageLoad: boolean ;
  constructor(private loginService: AppServDataService, private router: Router) {
    this.pageLoad = this.loginService.pageLoad;
  }

  loginButton() {
    this.loginService.formActive = !this.loginService.formActive;
  }
  checkRegister() {
    this.loginService.getMyData().subscribe( data => {
        if ( data.user.authorization ) {
          this.loginService.loginSucess = true;
          this.loginService.formMode = false;
          this.loginService.userData = data;
          this.loginService.setLogIn(data);
        } else {
          this.loginService.loginSucess = false;
          this.loginService.logOut();
        }
        if (!this.loginService.loginSucess && this.router.url === '/profile') {
          this.router.navigateByUrl('/');
        }
        this.loginService.pageLoad = true;
        return;
      }, (err) => {
        if (!this.loginService.loginSucess && this.router.url === '/profile') {
          this.loginService.loginSucess = false;
          this.loginService.logOut();
          this.router.navigateByUrl('/');
        }
        this.loginService.pageLoad = true;
    });
  }
  ngOnInit() {
    this.checkRegister();
  }

}
