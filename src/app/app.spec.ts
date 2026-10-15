import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render navigation links', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const nav: HTMLElement = fixture.nativeElement.querySelector('nav');
    expect(nav.textContent).toContain('Home');
    expect(nav.textContent).toContain('Products');
  });
});