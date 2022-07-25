import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestPackPageComponent } from './test-pack-page.component';

describe('TestPackPageComponent', () => {
  let component: TestPackPageComponent;
  let fixture: ComponentFixture<TestPackPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestPackPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestPackPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
