import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteStreamComponent } from './delete-stream.component';

describe('DeleteStreamComponent', () => {
  let component: DeleteStreamComponent;
  let fixture: ComponentFixture<DeleteStreamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteStreamComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteStreamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
