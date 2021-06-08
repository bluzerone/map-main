import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyCabinetComponent } from './company-cabinet.component';

describe('CompanyCabinetComponent', () => {
  let component: CompanyCabinetComponent;
  let fixture: ComponentFixture<CompanyCabinetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanyCabinetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyCabinetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
