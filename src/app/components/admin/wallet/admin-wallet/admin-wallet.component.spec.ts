import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminWalletComponent } from './admin-wallet.component';

describe('AdminWalletComponent', () => {
  let component: AdminWalletComponent;
  let fixture: ComponentFixture<AdminWalletComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminWalletComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminWalletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
