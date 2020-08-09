import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppServDataService } from '../loginServ/app-serv-data.service';
import {  Router, ActivatedRoute, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-single-news-page',
  templateUrl: './single-news-page.component.html',
  styleUrls: ['./single-news-page.component.css']
})
export class SingleNewsPageComponent implements OnInit, OnDestroy {
  newsObject: any;
  relativeNews: any;
  navigationSubscription;
  constructor(private loginService: AppServDataService,
    private router: Router,
    private routeActive: ActivatedRoute) { }

  async getNews(numberOfItems, moreNews, snapshotId) {/**/
    await this.loginService.getAllNewsFromServer(snapshotId, numberOfItems,
      (moreNews === false) ? this.routeActive.snapshot.params.term : false).subscribe((res) => {
        if (!moreNews) {
          this.newsObject = res.news;
          this.loginService.pageLoad = true;
          console.log(this.newsObject);
        } else {
          this.relativeNews = res.news;
          console.log(this.relativeNews);
        }
    });
  }
  routerEvents(){
    this.navigationSubscription = this.routeActive.params.subscribe(routeParams => {
      this.getNews('1', false, routeParams.id);
      this.getNews('5', true, routeParams.id);
    });
  }

  ngOnInit(): void {
    this.routerEvents();
  }

  ngOnDestroy() {

    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }

}
