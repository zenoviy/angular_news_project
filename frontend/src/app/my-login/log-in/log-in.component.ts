import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FormArray, FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { AppServDataService } from '../../loginServ/app-serv-data.service';
import { AuthService } from 'angularx-social-login';
import { SocialUser } from 'angularx-social-login';
import { FacebookLoginProvider } from 'angularx-social-login';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {
  displayData: any;
  errorState = false;
  profileForms = this.formBuildModel();
  errorText: string;
  private user: SocialUser;
  private loggedIn: boolean;
  constructor(private formBuilderGroup: FormBuilder,
    private loginService: AppServDataService,
    private router: Router,
    private authService: AuthService) { }

  get email() {
    return this.profileForms.get('email');
  }
  get password() {
    return this.profileForms.get('password');
  }
  get f() { return this.profileForms.controls; }
  formBuildModel() {
    return this.formBuilderGroup.group({
      email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-zA-Z0-9_.@-]*')]],
      password: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9_-]*')]]
    });
  }
  inspectForm(): void {
    if (this.profileForms.valid) {

      this.displayData = JSON.stringify(this.profileForms.value);
      this.profileForms = this.formBuildModel();
      this.userLogn(this.displayData, '/api/login');
      this.errorState = false;
    } else {
      this.errorText = 'There is empty field';
      this.errorState = true;
    }
  }
  faceboolLogin(event) {
    event.preventDefault();
    this.signInWithFB();
    // this.loginService.facebookLOgin();
  }
  userLogn(data, route) {
    this.loginService.pageLoad = false;
    this.loginService.userLogn(data, route).subscribe((res) => {
      this.loginService.loginSucess = true;
      console.log(res);
      this.loginService.setLogIn( res );
      this.router.navigateByUrl('/profile');
      this.checkRegister();
      this.loginService.pageLoad = true;
    }, (err) => {console.error(err); console.log(err, ' ERROR');
  });
    this.getAllUser();
  }
  getAllUser() {
    this.loginService.getLoginDate().subscribe( data => {    // Get data from server
      this.loginService.logData = data;
    }, error => {
      console.error(error);
    });
  }
  logout() {
    this.loginService.loginSucess = false;
    this.router.navigateByUrl('/');
    this.loginService.logOut();
  }
  checkRegister() {
    this.loginService.getMyData().subscribe( data => {
      this.loginService.userData = data;
    }, error => {
      console.error(error);
      console.log('eeeeee');
    });
  }
  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then(( userData ) => {
      this.userLogn(userData, '/api/loginfb');
    });
  }
  faceboolLogout(event): void {
    event.preventDefault();
    this.authService.signOut();
  }
  ngOnInit() {
    this.loginService.isLogIn();

    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
    });
  }

}
