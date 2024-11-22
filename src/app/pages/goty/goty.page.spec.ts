import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GOTYPage } from './goty.page';

describe('GOTYPage', () => {
  let component: GOTYPage;
  let fixture: ComponentFixture<GOTYPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(GOTYPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
