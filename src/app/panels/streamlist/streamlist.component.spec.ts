import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StreamlistComponent } from './streamlist.component';

describe('StreamlistComponent', () => {
  let component: StreamlistComponent;
  let fixture: ComponentFixture<StreamlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StreamlistComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(StreamlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
