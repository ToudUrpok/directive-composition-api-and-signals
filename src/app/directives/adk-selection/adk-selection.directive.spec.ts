import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { AdkSelectionDirective } from './adk-selection.directive';

@Component({
  standalone: true,
  selector: 'adk-host',
  template: ``,
  hostDirectives: [AdkSelectionDirective],
})
class HostComponent {}

describe('AdkSelection', () => {
  let selection: AdkSelectionDirective;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HostComponent],
    }).compileComponents();
    const fixture = TestBed.createComponent(HostComponent);
    selection = fixture.debugElement.injector.get(AdkSelectionDirective);
  });

  it('should select items', () => {
    selection.select(1, 2, 3);
    expect(selection.count()).toBe(3);
  });

  it('should deselect items', () => {
    selection.select(1, 2, 3);
    selection.deselect(1);
    expect(selection.count()).toBe(2);
  });

  it('should clear items', () => {
    selection.select(1, 2, 3);
    selection.clear();
    expect(selection.count()).toBe(0);
  });

  it('should check if item is selected', () => {
    selection.select(1, 2, 3);
    expect(selection.selected(1)).toBe(true);
  });
});
