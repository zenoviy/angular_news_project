/* Component to fetch data from server */
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { FacebookLoginProvider, GoogleLoginProvider, SocialUser } from 'angularx-social-login';
import { CookieService } from 'ngx-cookie-service';
import { errorHandler } from '@angular/platform-browser/src/browser';

interface ILogData {
    _id: string;
    name: string;
    email: string;
    password: string;
}
interface ILogTokenData {
  token: {
    id_token: string;
  };
  user: {
    _id: string;
    name: string;
    email: string;
    authorization: boolean;
  };
}
interface INewsData {
  newsName: string;
  postNumbers: number[];
  news: {
    source: {
      id: string;
      name: string;
    };
    author: string;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
    content: string;
    social: {
        likes: number;
        comments: {
            authors: string[];
            comments: string[];
        };
    };
  };
}


@Injectable({
  providedIn: 'root'
})
export class AppServDataService {
  formActive = false;    // show/hide state of the form
  pageLoad = false;
  logData: any;
  userData: any = '';
  loginProcessInfo: any = '';
  loginCookieValue: any;
  loginSucess = false;
  formMode = true;
  errorMessage: string;
  public loginLocalstorage: string;
  newsSourceBrand = [{pictureName: 'bbc-news', description: `BBC News is an operational business
   division of the British Broadcasting Corporation (BBC) responsible
   for the gathering and broadcasting of news and current affairs.`,
   backgroundImage: 'bbc-news.jpg'
  },
  {pictureName: 'cnn', description: `Cable News Network (CNN) is an American news-based pay
   television channel owned by AT&T's WarnerMedia.
    CNN was founded in 1980 by American media proprietor Ted Turner as a 24-hour cable news channel.`,
    backgroundImage: 'cnn.jpeg'
  },
  {pictureName: 'the-washington-post', description: `is a major American daily newspaper published in
   Washington, D.C., with a particular emphasis on national politics and the federal government.
    It has the largest circulation in the Washington metropolitan area.`,
    backgroundImage: 'washington-dc.jpg'
  },
  {pictureName: 'the-new-york-times', description: `is an American newspaper based in New York City
   with worldwide influence and readership. Founded in 1851, the paper has won 127 Pulitzer Prizes,
    more than any other newspaper`, backgroundImage: 'new-york.jpg'},
  {pictureName: 'the-verge', description: `The Verge is an American technology news and media network operated by
   Vox Media. The network publishes news items, long-form feature stories, guidebooks, product reviews, and podcasts. `
   , backgroundImage: 'VergeOG.png'
  },
  {pictureName: 'abc-news', description: `is the news division of the American Broadcasting Company (ABC),
   owned by the Disney Media Networks division of The Walt Disney Company`, backgroundImage: 'abc-news-youth-leadership-speaker.jpg'},
  {pictureName: 'daily-mail', description: `is a British daily middle-market newspaper published in London in a tabloid format.
   Founded in 1896, it is the United Kingdom's
    second-biggest-selling daily newspaper after The Sun`, backgroundImage: 'Daily-Mail-Background-01.jpg'},
  {pictureName: 'new-scientist', description: ` first published on 22 November 1956, is a weekly, English-language magazine that
   covers all aspects of science and technology. New Scientist, based in London, publishes editions in the UK,
    the United States, and Australia.`, backgroundImage: 'Illo1_p1-2_Metaphysics-1_1250.jpg'},
  {pictureName: 'national-geographic', description: `  is the official magazine of the National Geographic Society. It has been published
   continuously since its first issue in 1888, nine months after the Society itself was founded. It primarily contains articles
    about science, geography, history, and world culture.`, backgroundImage: 'nationag_geo.jpg'},
  {pictureName: 'ign', description: ` is an American video game and entertainment media website operated by IGN Entertainment Inc.,
   a subsidiary of Ziff Davis, itself wholly owned by j2 Global.`, backgroundImage: '1900x1200_ign_3d_xzmu.1920.jpg'},
  {pictureName: 'polygon', description: `s an American video game website that publishes news, culture, reviews, and videos.`,
   backgroundImage: '9258afc8-091b-4281-8b08-c03a89226214_scaled.jpg' }];
  constructor(
    private http: HttpClient,
    private loginCockiesService: CookieService
    ) { }

  setLogIn(value) {
    this.loginCockiesService.set( 'userInfo', value.token.id_token.toString() );
    this.isLogIn();
  }
 isLogIn() {
    if (this.loginCockiesService.get('userInfo')) {
       this.loginCookieValue = this.loginCockiesService.get('userInfo');
       return this.loginCockiesService.get('userInfo');
    }
  }
  logOut() {
    this.loginCockiesService.deleteAll('userInfo');
    this.loginCookieValue = '';
  }

  errorHendler(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      this.loginProcessInfo = error.error;
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);

        if (error.error === '401') {
          this.errorMessage = 'You are Unauthorized 401';
        } else if ( error.error === '500') {
          this.errorMessage = 'No user at server 500';
        } else if ( error.error === '409') {
          this.errorMessage = `User already exist ${error.error}`;
        } else {
          this.errorMessage = error.error;
        }
        return throwError(this.errorMessage);
    }
  }

  getLoginDate() {                                        // GET all
    return this.http.get<ILogTokenData>('/api/users');
  }

  getLoginDataById(_id) {                                  // GET single
    return this.http.get<ILogTokenData>(`/api/users/${_id}`);
  }

 postLoginDate(data: ILogData, route: string): Observable<ILogData> {     //  POST
    return this.http.post<ILogData>(route, data, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }).pipe(catchError( this.errorHendler ));
  }

  deleteProfile(_id: ILogData): Observable<ILogData> {         //  DELETE
    return this.http.delete<ILogData>(`/api/users/${_id}`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }).pipe(catchError( this.errorHendler ));
  }/**/


  /*   Business logic  */

  putLoginDate(data: ILogTokenData): Observable<ILogTokenData> {     //  PUT
    return this.http.post<ILogTokenData>(`/api/user/${data.user._id ? data.user._id : false  }`, data, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }).pipe(catchError(this.errorHendler));
  }
  initPutDate(data): void {
    this.putLoginDate(data).subscribe((result) => {
      console.log(result);
    });
  }
  getMyData(): Observable<ILogTokenData> {            // use JWT Token to get particular data
    return this.http.get<ILogTokenData>('/api/userInfo', {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${ this.isLogIn() }`
      })
    }).pipe(catchError( this.errorHendler ));
  }/**/

userRegistration(data) {
  return this.postLoginDate(data, '/api/register');        // add user and take his proppertyes
}
userLogn(data, route) {
  return this.postLoginDate(data, route);
}

findUserById(_id): void {
  this.getLoginDataById( _id.toString() ).subscribe(data => {    // Get data from server
    this.logData = data;
  }, error => {
    console.error(error);
  });
}

/*  Get News from Api  sourceName, itemsNumber */

getAllNewsFromServer(sourceName, itemsNumber, singleArticle) {
  return this.http.get<INewsData>('/api/newsInfo', {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'my-heaer-source': sourceName,
      'my-header-items-number': itemsNumber,
      'my-head-article-name': singleArticle
    })
  }).pipe(catchError( this.errorHendler ));
}

}
