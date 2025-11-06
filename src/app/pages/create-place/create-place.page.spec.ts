import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreatePlacePage } from './create-place.page';

describe('CreatePlacePage', () => {
  let component: CreatePlacePage;
  let fixture: ComponentFixture<CreatePlacePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePlacePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
