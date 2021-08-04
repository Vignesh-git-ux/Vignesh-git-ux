import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScmlandingComponent } from './scmlanding.component';

describe('ScmlandingComponent', () => {
  let component: ScmlandingComponent;
  let fixture: ComponentFixture<ScmlandingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScmlandingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScmlandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
