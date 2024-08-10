import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileFooterComponent } from './file-footer.component';

describe('FileFooterComponent', () => {
  let component: FileFooterComponent;
  let fixture: ComponentFixture<FileFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FileFooterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FileFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
