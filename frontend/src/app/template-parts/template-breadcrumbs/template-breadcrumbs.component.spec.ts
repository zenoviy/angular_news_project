import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateBreadcrumbsComponent } from './template-breadcrumbs.component';

describe('TemplateBreadcrumbsComponent', () => {
  let component: TemplateBreadcrumbsComponent;
  let fixture: ComponentFixture<TemplateBreadcrumbsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemplateBreadcrumbsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateBreadcrumbsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
