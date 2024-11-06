import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PioresPage } from './piores.page';

describe('PioresPage', () => {
  let component: PioresPage;
  let fixture: ComponentFixture<PioresPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PioresPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
