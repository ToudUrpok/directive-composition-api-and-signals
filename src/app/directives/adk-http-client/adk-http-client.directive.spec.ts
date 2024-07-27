import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { Component } from '@angular/core';
import { AdkHttpClientDirective } from './adk-http-client.directive';

@Component({
  standalone: true,
  selector: 'adk-host',
  template: ``,
  hostDirectives: [{ directive: AdkHttpClientDirective, inputs: ['adkUrl'] }],
})
class HostComponent {}

describe('AdkHttpClient', async () => {
  let client: AdkHttpClientDirective;
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
      imports: [HostComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(HostComponent);
    client = fixture.debugElement.injector.get(AdkHttpClientDirective);
    fixture.componentRef.setInput(
      'adkUrl',
      'https://jsonplaceholder.typicode.com/todos'
    );
  });

  it('should fetch data', async () => {
    const promise = client.getListPage();

    const controller = TestBed.inject(HttpTestingController);
    controller
      .expectOne(
        'https://jsonplaceholder.typicode.com/todos?_page=1&_limit=10'
      )
      .flush([{ id: 1, title: 'Todo 1', completed: false }], {
        headers: { 'X-Total-Count': '1' },
      });

    controller.verify();
    expect(await promise).toEqual({
      items: [{ id: 1, title: 'Todo 1', completed: false }],
      total: 1,
    });
  });
});
