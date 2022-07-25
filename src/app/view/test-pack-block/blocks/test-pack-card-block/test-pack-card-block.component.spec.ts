import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestPackCardBlockComponent } from './test-pack-card-block.component';

describe('TestPackCardBlockComponent', () => {
  let component: TestPackCardBlockComponent;
  let fixture: ComponentFixture<TestPackCardBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestPackCardBlockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestPackCardBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
