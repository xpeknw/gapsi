import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MainComponent } from './main.component';
import { Router } from '@angular/router';
import { ApiService } from '../../utils/network/api';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { Utils } from '../../utils/utils';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatMenuModule } from '@angular/material/menu';

class MockUtils {
  launchMessage(title: string, message: string, type: string) {
    return Promise.resolve({ isConfirmed: true });
  }
}

describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;
  let httpMock: HttpTestingController;
  let apiService: ApiService;
  let routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
  let utils: Utils;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MatPaginatorModule, MatSortModule, BrowserAnimationsModule, MatMenuModule],
      declarations: [MainComponent],
      providers: [
        { provide: ApiService },
        { provide: Router, useValue: routerSpy },
        { provide: Utils, useClass: MockUtils }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    apiService = TestBed.inject(ApiService);
    utils = TestBed.inject(Utils);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});
