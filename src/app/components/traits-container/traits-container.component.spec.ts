import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TraitsContainerComponent } from './traits-container.component';

describe('TraitsContainerComponent', () => {
  let component: TraitsContainerComponent;
  let fixture: ComponentFixture<TraitsContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TraitsContainerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TraitsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
