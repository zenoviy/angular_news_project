import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsSourcePageComponent } from './news-source-page.component';

describe('NewsSourcePageComponent', () => {
  let component: NewsSourcePageComponent;
  let fixture: ComponentFixture<NewsSourcePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsSourcePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsSourcePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
