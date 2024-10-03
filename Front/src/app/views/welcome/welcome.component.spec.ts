import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WelcomeComponent } from './welcome.component';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { ApiService } from '../../utils/network/api';
import { environment } from '../../../environments/environment.prod';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';

class MockApiService {
  getAppVersion() {
    return of({ version: "1.0.0" });
  }
}

describe('WelcomeComponent', () => {
  let component: WelcomeComponent;
  let fixture: ComponentFixture<WelcomeComponent>;
  let routerSpy: jasmine.SpyObj<Router>;
  let apiService: ApiService;

  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: ApiService, useClass: MockApiService },
        { provide: Router, useValue: routerSpy },
      ],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [WelcomeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(WelcomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    apiService = TestBed.inject(ApiService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set version correctly when getAppVersion is successful', () => {
    component.getAppVersion();
    expect(component.version).toBe('1.0.0');
  });

  it('should set version from environment on getAppVersion error', () => {
    spyOn(apiService, 'getAppVersion').and.returnValue(throwError('error'));
    component.getAppVersion();
    expect(component.version).toBe(environment.version);
  });

  it('should navigate to main page when goToMain is called', () => {
    component.goToMain();
    expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('principal', { replaceUrl: true });
  });

  it('should return a profile image URL', () => {
    const profileImageUrl = component.getProfileImage();
    expect(profileImageUrl).toBe('https://picsum.photos/200');
  });
});
