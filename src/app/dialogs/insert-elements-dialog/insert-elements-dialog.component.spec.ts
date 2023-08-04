import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertElementsDialogComponent } from './insert-elements-dialog.component';

describe('InsertElementsDialogComponent', () => {
  let component: InsertElementsDialogComponent;
  let fixture: ComponentFixture<InsertElementsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsertElementsDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InsertElementsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
