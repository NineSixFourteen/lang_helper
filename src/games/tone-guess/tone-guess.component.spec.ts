import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToneGuessComponent } from './tone-guess.component';

describe('ToneGuessComponent', () => {
  let component: ToneGuessComponent;
  let fixture: ComponentFixture<ToneGuessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToneGuessComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ToneGuessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
