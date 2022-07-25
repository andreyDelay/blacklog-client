import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JointPageComponent } from './joint-page.component';

describe('JointPageComponent', () => {
  let component: JointPageComponent;
  let fixture: ComponentFixture<JointPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JointPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JointPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
