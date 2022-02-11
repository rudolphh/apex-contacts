import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { ContactEditComponent } from './contact-edit.component';

describe('ContactEditComponent', () => {
  let component: ContactEditComponent;
  let fixture: ComponentFixture<ContactEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show contact-id', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('[data-test="contact-id"')).toBeTruthy();
  });

  it('should show first-name', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('[data-test="first-name"')).toBeTruthy();
  });

  it('should show last-name', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('[data-test="last-name"')).toBeTruthy();
  });

  it('should show email', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('[data-test="email"')).toBeTruthy();
  });
});
