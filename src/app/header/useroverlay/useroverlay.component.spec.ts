import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UseroverlayComponent } from './useroverlay.component';

describe('UseroverlayComponent', () => {
  let component: UseroverlayComponent;
  let fixture: ComponentFixture<UseroverlayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UseroverlayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UseroverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
