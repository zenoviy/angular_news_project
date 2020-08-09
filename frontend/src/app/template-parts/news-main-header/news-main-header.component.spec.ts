import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsMainHeaderComponent } from './news-main-header.component';

describe('NewsMainHeaderComponent', () => {
  let component: NewsMainHeaderComponent;
  let fixture: ComponentFixture<NewsMainHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsMainHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsMainHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
