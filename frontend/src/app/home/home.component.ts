import { Component, OnInit, resolveForwardRef } from '@angular/core';
import { AppServDataService } from '../loginServ/app-serv-data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  newsObject = {};
  brandDescription;
  constructor(private loginService: AppServDataService) { }

  getNews() {
    this.loginService.getAllNewsFromServer('all', '9', false).subscribe((res) => {
      this.newsObject = res;
      console.log( this.newsObject );
      /*this.newsObject.newsInfo.forEach((x) =>{
        console.log( x.backgroundImage );
      });*/
    });
  }


  findBrandPic(object){
    const brandObject = this.brandDescription.find((x) => {
      return x.pictureName === object.sourceName;
    });
    brandObject.newPic = `assets/img/news background/${brandObject.backgroundImage}`;
    return brandObject;
  }
  shortDescription(text) {
    const res = text.split(' ').slice(0, 25).join(' ') + '...';
    const shortEnd = (text.split(' ') > 25) ? '...' : '';
    return res + shortEnd;
  }
  ngOnInit() {
    this.getNews();
    this.brandDescription = this.loginService.newsSourceBrand;
  }

}
