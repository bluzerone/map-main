import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClarificationsComponent } from './clarifications.component';

describe('ClarificationsComponent', () => {
  let component: ClarificationsComponent;
  let fixture: ComponentFixture<ClarificationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClarificationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClarificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
