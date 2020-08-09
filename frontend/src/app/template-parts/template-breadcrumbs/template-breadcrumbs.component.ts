import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-template-breadcrumbs',
  templateUrl: './template-breadcrumbs.component.html',
  styleUrls: ['./template-breadcrumbs.component.css']
})
export class TemplateBreadcrumbsComponent implements OnInit, OnDestroy {
  routeArr: string[];
  routeLinkArr: string[];
  navigationSubscription;
  constructor(private router: Router, private routeActive: ActivatedRoute) { }


  checkBreadCrumbs() {
    this.routeArr = this.router.url.split('/');
    this.routeLinkArr = this.routeArr.map((x, i) => {
      const res = this.routeArr.slice(0, i + 1 ).join('/');
      return res;
    });
    this.routeArr[0] = 'home';
  }

  routerEvents() {
    this.navigationSubscription = this.routeActive.params.subscribe(routeParams => {
      this.checkBreadCrumbs();
    });
  }
  ngOnInit() {
    this.routerEvents();
  }
  ngOnDestroy() {
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }
}
