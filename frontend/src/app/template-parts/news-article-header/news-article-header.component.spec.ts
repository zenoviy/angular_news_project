import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsArticleHeaderComponent } from './news-article-header.component';

describe('NewsArticleHeaderComponent', () => {
  let component: NewsArticleHeaderComponent;
  let fixture: ComponentFixture<NewsArticleHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsArticleHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsArticleHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
