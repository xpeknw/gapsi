import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Providers, ProvidersData } from '../models/provider';
import { AppVersion } from '../models/appversion';

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
  constructor(
    private http: HttpClient,
  ) {
    this.gapsiApi = "http://localhost:3000/";
  }

  // setLoading(state: boolean) {
  //   this._events.setReloadData(state);
  // }

  getAppVersion(){
    return this.http.get<AppVersion>(this.gapsiApi + `appversion`, this.header).pipe(
      tap(response => {
        this.appversion.next(response);
      })
    );
  }

  getProvidersData() {
    return this.http.get<ProvidersData>(this.gapsiApi + `providers`, this.header).pipe(
      tap(response => {
        this.providers.next(response);
      })
    );
  }

  getProvider(providerId: string){
    return this.http.get<Providers>(this.gapsiApi + `provider/${providerId}`, this.header).pipe(
      tap(response => {
        this.provider.next(response);
      })
    );
  }

  patchProvider(provider: Providers) {
    return this.http.patch<any>(this.gapsiApi + `provider/${provider.id}`, provider, this.header).pipe(
      tap(response => {
        this.singlestring.next(response);
      })
    );
  }

  createProvider(provider: Providers) {
    return this.http.post<any>(this.gapsiApi + `provider`, provider, this.header).pipe(
      tap(response => {
        this.singlestring.next(response);
      })
    );
  }

  deleteProvider(provider: Providers) {
    return this.http.delete<string>(this.gapsiApi + `provider/${provider.id}`, this.header).pipe(
      tap(response => {
        this.singlestring.next(response);
      })
    );
  }
}

