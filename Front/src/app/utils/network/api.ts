// ApiService for communication with the backend and the external Api to get information of fictional users
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Providers, ProvidersData } from '../models/provider';
import { AppVersion } from '../models/appversion';
import { UserData } from '../models/user';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  singlestring: Subject<string> = new Subject();
  header = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }
  token: string = "";
  gapsiApi = "";
  providers: Subject<ProvidersData> = new Subject();
  provider: Subject<Providers> = new Subject();
  appversion: Subject<AppVersion> = new Subject();
  userData: Subject<UserData> = new Subject();
  constructor(
    private http: HttpClient,
  ) {
    this.gapsiApi = environment.api;
  }

  // Get the Appversion and return AppVersion Model
  getAppVersion() {
    return this.http.get<AppVersion>(this.gapsiApi + `appversion`, this.header).pipe(
      tap(response => {
        this.appversion.next(response);
      })
    );
  }

  // Get the fictional information of a user and return UserData Model
  getRandomNameAndPhoto() {
    return this.http.get<UserData>('https://randomuser.me/api/').pipe(
      tap(response => {
        this.userData.next(response);
      })
    );
  }

  // Get the list of providers return ProvidersData Model
  getProvidersData() {
    return this.http.get<ProvidersData>(this.gapsiApi + `providers`, this.header).pipe(
      tap(response => {
        this.providers.next(response);
      })
    );
  }

  // Get the information of a providers by its own id and return Providers Model
  getProvider(providerId: string) {
    return this.http.get<Providers>(this.gapsiApi + `provider/${providerId}`, this.header).pipe(
      tap(response => {
        this.provider.next(response);
      })
    );
  }

  // Update the information of a providers by its own id
  patchProvider(provider: Providers) {
    return this.http.patch<any>(this.gapsiApi + `provider/${provider.id}`, provider, this.header).pipe(
      tap(response => {
        this.singlestring.next(response);
      })
    );
  }

  // Create new provider
  createProvider(provider: Providers) {
    return this.http.post<any>(this.gapsiApi + `provider`, provider, this.header).pipe(
      tap(response => {
        this.singlestring.next(response);
      })
    );
  }

  // Delete the information of a providers by its own id
  deleteProvider(provider: Providers) {
    return this.http.delete<string>(this.gapsiApi + `provider/${provider.id}`, this.header).pipe(
      tap(response => {
        this.singlestring.next(response);
      })
    );
  }
}