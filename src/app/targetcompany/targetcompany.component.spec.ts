import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TargetCompanyComponent } from './targetcompany.component';

describe('TargetCompanyComponent', () => {
  let component: TargetCompanyComponent;
  let fixture: ComponentFixture<TargetCompanyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TargetCompanyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TargetCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
