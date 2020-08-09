import { Component, OnInit } from '@angular/core';
import { AppServDataService } from '../../loginServ/app-serv-data.service';

@Component({
  selector: 'app-news-main-footer',
  templateUrl: './news-main-footer.component.html',
  styleUrls: ['./news-main-footer.component.css']
})
export class NewsMainFooterComponent implements OnInit {
  constructor(private loginService: AppServDataService ) {
  }

  loginButton() {
    this.loginService.formActive = !this.loginService.formActive;
  }
  ngOnInit() {

  }

}
