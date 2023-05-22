import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetSchemaComponent } from './get-schema.component';

describe('GetSchemaComponent', () => {
  let component: GetSchemaComponent;
  let fixture: ComponentFixture<GetSchemaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetSchemaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetSchemaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
