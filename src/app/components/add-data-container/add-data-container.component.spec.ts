import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDataContainerComponent } from './add-data-container.component';

describe('AddDataContainerComponent', () => {
  let component: AddDataContainerComponent;
  let fixture: ComponentFixture<AddDataContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddDataContainerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddDataContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
