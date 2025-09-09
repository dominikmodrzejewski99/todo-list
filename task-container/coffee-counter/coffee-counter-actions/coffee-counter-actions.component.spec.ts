import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoffeeCounterActionsComponent } from './coffee-counter-actions.component';

describe('CoffeeCounterActionsComponent', () => {
  let component: CoffeeCounterActionsComponent;
  let fixture: ComponentFixture<CoffeeCounterActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoffeeCounterActionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoffeeCounterActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
