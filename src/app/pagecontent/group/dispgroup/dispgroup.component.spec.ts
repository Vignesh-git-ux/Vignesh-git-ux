import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DispgroupComponent } from './dispgroup.component';

describe('DispgroupComponent', () => {
  let component: DispgroupComponent;
  let fixture: ComponentFixture<DispgroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DispgroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DispgroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
