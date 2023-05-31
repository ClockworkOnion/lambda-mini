import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditQueryTextComponent } from './edit-query-text.component';

describe('EditQueryTextComponent', () => {
  let component: EditQueryTextComponent;
  let fixture: ComponentFixture<EditQueryTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditQueryTextComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditQueryTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
