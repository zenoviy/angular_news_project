import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsMainFooterComponent } from './news-main-footer.component';

describe('NewsMainFooterComponent', () => {
  let component: NewsMainFooterComponent;
  let fixture: ComponentFixture<NewsMainFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsMainFooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsMainFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
