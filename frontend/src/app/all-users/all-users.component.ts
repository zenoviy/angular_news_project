import { Component, OnInit } from '@angular/core';
import { AppServDataService } from '../loginServ/app-serv-data.service';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css']
})
export class AllUsersComponent implements OnInit {
  constructor(private loginService: AppServDataService) { }

  trackByCode(index: number, obj: any): string {
    return obj.user._id;
  }
  deleteUser(userId) {
    this.loginService.deleteProfile(userId.toString()).subscribe((obj) => {console.log(obj, 'is Delleted'); }, (err) => {
       console.error(err);
    });
    this.getAllUser();
  }
  async getAllUser() {
    this.loginService.getLoginDate().subscribe( data => {    // Get data from server
      this.loginService.logData = data;
    }, error => {
      console.error(error);
    });
  }
  async checkRegister() {
    await this.loginService.getMyData().subscribe( data =>{
      console.log(data)
       this.loginService.userData = data;
    });
  }
  ngOnInit() {
    this.checkRegister();
    this.getAllUser();
  }
}
