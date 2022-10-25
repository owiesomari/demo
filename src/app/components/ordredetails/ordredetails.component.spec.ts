import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdredetailsComponent } from './ordredetails.component';

describe('OrdredetailsComponent', () => {
  let component: OrdredetailsComponent;
  let fixture: ComponentFixture<OrdredetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrdredetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrdredetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
