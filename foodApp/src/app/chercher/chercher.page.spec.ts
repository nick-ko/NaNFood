import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChercherPage } from './chercher.page';

describe('ChercherPage', () => {
  let component: ChercherPage;
  let fixture: ComponentFixture<ChercherPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChercherPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChercherPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
