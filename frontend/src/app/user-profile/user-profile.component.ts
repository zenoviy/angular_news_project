import { Component, OnInit } from '@angular/core';
import { AppServDataService } from '../loginServ/app-serv-data.service';
import { async } from 'q';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
  providers: [AppServDataService]
})
export class UserProfileComponent implements OnInit {
  logData: any;
  allData: any;
  constructor(private loginService: AppServDataService) {
  }

 checkRegister() {
  this.loginService.getMyData().subscribe( data => {
    delete data.token;
    this.logData = data;
  }, (err) => {console.error(err); console.log(err, ' ERROR'); this.loginService.loginSucess = false; });
}
  ngOnInit() {
    this.checkRegister();

  }

}
