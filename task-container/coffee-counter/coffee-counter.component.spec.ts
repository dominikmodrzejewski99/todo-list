import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoffeeCounterComponent } from './coffee-counter.component';

describe('CoffeeCounterComponent', () => {
  let component: CoffeeCounterComponent;
  let fixture: ComponentFixture<CoffeeCounterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoffeeCounterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoffeeCounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
