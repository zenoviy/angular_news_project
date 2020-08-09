import { Component, OnInit } from '@angular/core';
import {FormArray, FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { AppServDataService } from '../../loginServ/app-serv-data.service';
import { async } from 'q';
import { getTypeNameForDebugging } from '@angular/core/src/change_detection/differs/iterable_differs';
import { Router } from '@angular/router';
import { AuthService } from 'angularx-social-login';
import { SocialUser } from 'angularx-social-login';
import { FacebookLoginProvider } from 'angularx-social-login';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  displayData: any;
  errorState: boolean = false;
  userObject;
  profileForms = this.formBuildModel();
  errorText: string;
  constructor(private formBuilderGroup: FormBuilder,
    private loginService: AppServDataService,
    private router: Router,
    private authService: AuthService
    ) {
  }
   //   Start validation
  get name() {
    return this.profileForms.get('name');
  }
  get email() {
    return this.profileForms.get('email');
  }
  get password() {
    return this.profileForms.get('password');
  }
  get f() { return this.profileForms.controls; }
  formBuildModel() {
    return this.formBuilderGroup.group({
      name: ['', Validators.compose([
          Validators.required,
          Validators.minLength(5),
          /*Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')*/])],
      email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-zA-Z0-9_.@-]*')]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern('^[a-zA-Z0-9_-]*')]]
    });
  }
  async inspectForm() {
    if (this.profileForms.valid) {
      this.displayData = JSON.stringify(this.profileForms.value);
      this.profileForms = this.formBuildModel();
      await this.userRegistration(this.displayData);
      this.errorState = false;
    } else {
      this.errorText = 'there is incorect or empty fields!';
      this.errorState = true;
    }
  }
  userRegistration(data) {
    this.loginService.userRegistration(data).subscribe( res => {         // add user and take his proppertyes
      this.loginService.setLogIn( res );
      console.log('Register Sucess', res);
      this.getAllUser();
      this.checkRegister();
    }, (err) => {console.error(err); console.log(err, ' ERROR');
    this.errorText = `Cant make registration: ${err}`; this.errorState = true; });
    if (this.loginService.loginProcessInfo) {
      this.errorText =  this.loginService.loginProcessInfo;
    }
  }
  userLogn(data, route) {
      this.loginService.userLogn(data, route).subscribe((res) => {
      this.checkRegister();

    }, (err) => {console.error(err); console.log(err, ' ERROR'); });
  }
  checkRegister() {
    this.loginService.getMyData().subscribe( data => {
        if ( data.user.authorization ) {
          this.loginService.loginSucess = true;
          this.loginService.formMode = false;
          this.loginService.userData = data;
          this.loginService.setLogIn(data);
          this.router.navigateByUrl('/profile');
        }
        this.getAllUser();
    });
  }
  faceboolLogin(event): void {
    event.preventDefault();
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then(( userData ) => {
      // console.log(userData);
      const registrObject = {
        name: userData.facebook.name,
        email: userData.facebook.email,
        password: userData.facebook.id
      };
      this.userRegistration(registrObject);
    });
  }
  getAllUser() {
    this.loginService.getLoginDate().subscribe( data => {    // Get data from server
      this.loginService.logData = data;
    }, error => {
      console.error(error);
    });
  }

  ngOnInit() {
    this.getAllUser();
    this.loginService.isLogIn();
  }

}
