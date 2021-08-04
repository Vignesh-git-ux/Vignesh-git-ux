import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DispscheduleComponent } from './dispschedule.component';

describe('DispscheduleComponent', () => {
  let component: DispscheduleComponent;
  let fixture: ComponentFixture<DispscheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DispscheduleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DispscheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
