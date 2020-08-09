import { Component, OnInit  } from '@angular/core';
import {FormArray, FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { AppServDataService } from '../loginServ/app-serv-data.service';
import { async } from 'q';
import { getTypeNameForDebugging } from '@angular/core/src/change_detection/differs/iterable_differs';

@Component({
  selector: 'app-my-login',
  templateUrl: './my-login.component.html',
  styleUrls: ['./my-login.component.css'],
})
export class MyLoginComponent implements OnInit {
  displayData: any;
  userObject;
  profileForms = this.formBuildModel();
  constructor(private formBuilderGroup: FormBuilder, private loginService: AppServDataService) {
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
      password: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9_-]*')]]
    });
  }
    //   End validation
  useRegistration() {
    this.loginService.formMode = true;
  }
  useLogIn() {
    this.loginService.formMode = false;
  }
  checkInput() {
    return (this.loginService.loginCookieValue)
    ? true
    : this.profileForms = this.formBuildModel(); /**/
  }

  ngOnInit() {
    this.loginService.isLogIn();
  }
}
