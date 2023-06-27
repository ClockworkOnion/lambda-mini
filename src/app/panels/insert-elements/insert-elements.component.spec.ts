import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertElementsComponent } from './insert-elements.component';

describe('InsertElementsComponent', () => {
  let component: InsertElementsComponent;
  let fixture: ComponentFixture<InsertElementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsertElementsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InsertElementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
