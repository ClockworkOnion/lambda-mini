import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DuplicateQueryComponent } from './duplicate-query.component';

describe('DuplicateQueryComponent', () => {
  let component: DuplicateQueryComponent;
  let fixture: ComponentFixture<DuplicateQueryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DuplicateQueryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DuplicateQueryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
