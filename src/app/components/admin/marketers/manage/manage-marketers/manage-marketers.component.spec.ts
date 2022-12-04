import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageMarketersComponent } from './manage-marketers.component';

describe('ManageMarketersComponent', () => {
  let component: ManageMarketersComponent;
  let fixture: ComponentFixture<ManageMarketersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageMarketersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageMarketersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
