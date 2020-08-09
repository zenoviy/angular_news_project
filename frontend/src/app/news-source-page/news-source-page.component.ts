import { Component, OnInit } from '@angular/core';
import { AppServDataService } from '../loginServ/app-serv-data.service';
import {  ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-news-source-page',
  templateUrl: './news-source-page.component.html',
  styleUrls: ['./news-source-page.component.css']
})
export class NewsSourcePageComponent implements OnInit {
  newsObject: any;
  newsTitle: string;
  pageItems = 10;
  newSource;
  constructor(private loginService: AppServDataService, private route: ActivatedRoute) {

   }

  getNews(numberOfItems) {/**/
    let newsSource: any = window.location.pathname.split('/');
    newsSource = newsSource[newsSource.length - 1];

    this.loginService.getAllNewsFromServer(newsSource, numberOfItems, false).subscribe((res) => {
      this.newsObject = res;
      this.newsTitle = this.newsObject.news[0].source.name;
      this.loginService.pageLoad = true;
      /*this.newsObject.newsInfo.forEach((x) =>{
        console.log( x.backgroundImage );
      });*/
      console.log( this.newsObject );
    });
  }
  showMore() {
    this.pageItems += 6;
    this.getNews(this.pageItems.toString());
  }
  exploreLink() {
    this.newSource = `/${this.route.snapshot.params.id}`;
  }

  ngOnInit() {
    this.getNews('9');
    this.exploreLink();
  }

}
