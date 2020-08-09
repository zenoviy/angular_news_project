import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsLoginHeaderComponent } from './news-login-header.component';

describe('NewsLoginHeaderComponent', () => {
  let component: NewsLoginHeaderComponent;
  let fixture: ComponentFixture<NewsLoginHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsLoginHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsLoginHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
