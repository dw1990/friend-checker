import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalyzeDataContainerComponent } from './analyze-data-container.component';

describe('AnalyzeDataContainerComponent', () => {
  let component: AnalyzeDataContainerComponent;
  let fixture: ComponentFixture<AnalyzeDataContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnalyzeDataContainerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AnalyzeDataContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
