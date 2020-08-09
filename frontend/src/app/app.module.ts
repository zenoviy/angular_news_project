import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { SocialLoginModule, AuthServiceConfig } from 'angularx-social-login';
import { FacebookLoginProvider } from 'angularx-social-login';

import { AppRoutingModule } from './app-routing.module';
import { AppServDataService } from './loginServ/app-serv-data.service';

import { AppComponent } from './app.component';
import { MyLoginComponent } from './my-login/my-login.component';
import { HomeComponent } from './home/home.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { RegistrationComponent } from './my-login/registration/registration.component';
import { LogInComponent } from './my-login/log-in/log-in.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { AllUsersComponent } from './all-users/all-users.component';
import { NewsMainFooterComponent } from './template-parts/news-main-footer/news-main-footer.component';
import { NewsMainHeaderComponent } from './template-parts/news-main-header/news-main-header.component';
import { NewsArticleHeaderComponent } from './template-parts/news-article-header/news-article-header.component';
import { SingleNewsPageComponent } from './single-news-page/single-news-page.component';
import { NewsLoginHeaderComponent } from './template-parts/news-login-header/news-login-header.component';
import { NewsSourcePageComponent } from './news-source-page/news-source-page.component';
import { TemplateBreadcrumbsComponent } from './template-parts/template-breadcrumbs/template-breadcrumbs.component';

const config = new AuthServiceConfig([
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider('464235371076234')
  }
]);
export function provideConfig() {
  return config;
}
@NgModule({
  declarations: [
    AppComponent,
    MyLoginComponent,
    HomeComponent,
    UserProfileComponent,
    RegistrationComponent,
    LogInComponent,
    NotfoundComponent,
    AllUsersComponent,
    NewsMainFooterComponent,
    NewsMainHeaderComponent,
    NewsArticleHeaderComponent,
    SingleNewsPageComponent,
    NewsLoginHeaderComponent,
    NewsSourcePageComponent,
    TemplateBreadcrumbsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    SocialLoginModule
  ],
  providers: [CookieService, AppServDataService, {
    provide: AuthServiceConfig,
    useFactory: provideConfig
  }],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
