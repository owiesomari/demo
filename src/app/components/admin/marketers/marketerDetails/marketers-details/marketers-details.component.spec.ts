import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketersDetailsComponent } from './marketers-details.component';

describe('MarketersDetailsComponent', () => {
  let component: MarketersDetailsComponent;
  let fixture: ComponentFixture<MarketersDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarketersDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarketersDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
