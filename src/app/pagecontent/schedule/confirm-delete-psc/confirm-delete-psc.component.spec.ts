import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmDeletePSCComponent } from './confirm-delete-psc.component';

describe('ConfirmDeletePSCComponent', () => {
  let component: ConfirmDeletePSCComponent;
  let fixture: ComponentFixture<ConfirmDeletePSCComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmDeletePSCComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmDeletePSCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
