import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowMovComponent } from './show-mov.component';

describe('ShowMovComponent', () => {
  let component: ShowMovComponent;
  let fixture: ComponentFixture<ShowMovComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowMovComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowMovComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
