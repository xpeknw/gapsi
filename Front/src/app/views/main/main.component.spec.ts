import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MainComponent } from './main.component';
import { Router } from '@angular/router';
import { ApiService } from '../../utils/network/api';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { of, throwError } from 'rxjs';
import { mockedProviders } from '../../../environments/environment.prod';
import { Utils } from '../../utils/utils';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
      imports: [HttpClientTestingModule, MatPaginatorModule, MatSortModule, BrowserAnimationsModule],
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

  // afterEach(() => {
  //   httpMock.verify(); // Verificar que no haya solicitudes pendientes
  // });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  // it('should get providers data from the API and configure the table', () => {
  //   const mockResponse = {
  //     total: '2',
  //     items: [
  //       { id: '1', name: 'Provider 1', trade_name: 'Trade 1', address: 'Address 1' },
  //       { id: '2', name: 'Provider 2', trade_name: 'Trade 2', address: 'Address 2' }
  //     ]
  //   };

  //   // Llamar al método getProviders
  //   component.getProviders();

  //   // Simular la respuesta HTTP de la API
  //   httpMock.expectNone('http://localhost:3000/providers');
  //   const req = httpMock.expectOne(`${apiService.gapsiApi}providers`); // Asegúrate de que la URL coincida con la de tu API
  //   // httpMock.expectNone('http://localhost:3000/providers');
  //   expect(req.request.method).toBe('GET');
  //   req.flush(mockResponse);

  //   // Verificar que los datos se hayan configurado correctamente en el componente
  //   expect(component.providers.length).toBe(2);
  //   expect(component.totalProviders).toBe('2');
  //   expect(component.dataSource instanceof MatTableDataSource).toBe(true);
  //   expect(component.dataSource.data.length).toBe(2);
  // });

  it('should get providers data from the API', () => {
    // Llama a la función que dispara la solicitud HTTP
    component.getProviders();

    // Captura todas las solicitudes coincidentes con la URL
    const reqs = httpMock.match((req) => req.url === 'http://localhost:3000/providers' && req.method === 'GET');

    // Verifica que solo haya una solicitud GET
    expect(reqs.length).toBe(1);

    // Responder a la solicitud GET
    reqs[0].flush([{ id: '1', name: 'Provider 1', trade_name: 'Trade 1', address: 'Address 1' }]);

    // Verificar los resultados en el componente
    expect(component.providers.length).toBe(1);
  });


  // it('should handle error and use mocked providers', () => {
  //   // Llamar al método getProviders
  //   component.getProviders();

  //   // Simular error en la solicitud HTTP
  //   const req = httpMock.expectOne('/api/providers');
  //   expect(req.request.method).toBe('GET');
  //   req.flush({}, { status: 500, statusText: 'Server Error' });

  //   // Verificar que se hayan usado los proveedores simulados
  //   expect(component.providers).toBe(mockedProviders);
  //   expect(component.totalProviders).toBe(mockedProviders.length.toString());
  //   expect(component.dataSource.data.length).toBe(mockedProviders.length);
  // });

  // it('should navigate to add new provider when addProvider is called', () => {
  //   component.addProvider();
  //   expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('proveedor/nuevo');
  // });

  // it('should navigate to edit provider when editProvider is called', () => {
  //   const provider = { id: '1', name: 'Provider 1', trade_name: 'Trade 1', address: 'Address 1' };
  //   component.editProvider(provider);
  //   expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('proveedor/1');
  // });

  // it('should delete provider and refresh the list when confirmed', async () => {
  //   const provider = { id: '1', name: 'Provider 1', trade_name: 'Trade 1', address: 'Address 1' };

  //   spyOn(apiService, 'deleteProvider').and.returnValue(of());

  //   component.deleteProvider(provider);

  //   // Esperar la promesa de `launchMessage`
  //   await fixture.whenStable();

  //   expect(apiService.deleteProvider).toHaveBeenCalledWith(provider);
  //   expect(routerSpy.navigateByUrl).not.toHaveBeenCalled();
  // });

  // it('should apply filter to the table data', () => {
  //   component.dataSource = new MatTableDataSource(mockedProviders);
  //   const event = { target: { value: 'provider' } } as unknown as Event;

  //   component.applyFilter(event);

  //   expect(component.dataSource.filter).toBe('provider');
  //   if (component.dataSource.paginator) {
  //     expect(component.dataSource.paginator.pageIndex).toBe(0);
  //   }
  // });
});
