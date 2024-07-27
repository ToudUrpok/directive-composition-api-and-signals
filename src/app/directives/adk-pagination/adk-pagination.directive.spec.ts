import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { AdkPaginationDirective } from './adk-pagination.directive';

@Component({
  standalone: true,
  selector: 'adk-host',
  template: ``,
  hostDirectives: [AdkPaginationDirective],
})
class HostComponent {}

describe('AdkPagination', () => {
  let pagination: AdkPaginationDirective;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HostComponent],
    }).compileComponents();
    const fixture = TestBed.createComponent(HostComponent);
    pagination = fixture.debugElement.injector.get(AdkPaginationDirective);
  });

  it('should go to the next page', () => {
    pagination.total.set(100);
    pagination.next();
    expect(pagination.page()).toBe(2);
  });

  it('should go to the previous page', () => {
    pagination.total.set(100);
    pagination.next();
    pagination.previous();
    expect(pagination.page()).toBe(1);
  });

  it('should throw an error if go to the previous page from the first page', () => {
    expect(() => pagination.previous()).toThrowError(
      'You are already on the first page'
    );
  });

  it('should throw an error if go to the next page from the last page', () => {
    pagination.total.set(10);
    expect(() => pagination.next()).toThrowError(
      'You are already on the last page'
    );
  });
});
