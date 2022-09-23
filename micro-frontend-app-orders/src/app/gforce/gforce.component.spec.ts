import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GforceComponent } from './gforce.component';

describe('GforceComponent', () => {
  let component: GforceComponent;
  let fixture: ComponentFixture<GforceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GforceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GforceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
