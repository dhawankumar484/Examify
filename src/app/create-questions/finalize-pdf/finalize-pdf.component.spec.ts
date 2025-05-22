import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalizePdfComponent } from './finalize-pdf.component';

describe('FinalizePdfComponent', () => {
  let component: FinalizePdfComponent;
  let fixture: ComponentFixture<FinalizePdfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinalizePdfComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinalizePdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
