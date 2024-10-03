import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../utils/network/api';
import { Providers } from '../../../utils/models/provider';
import { mockedProvider } from '../../../../environments/environment.prod';


@Component({
  templateUrl: 'providers.component.html'
})
export class ProvidersComponent {
  providerId = "";
  adding: boolean = false;
  selectedProvider!: Providers;
  constructor(
    private _router: Router,
    private _api: ApiService,
    private _activatedRoute: ActivatedRoute
  ) {
    this.selectedProvider = new Providers();
    this.selectedProvider.name = "pruebas"
    this.selectedProvider.trade_name = "pruebas"
    this.selectedProvider.address = "pruebas"
    this._activatedRoute.paramMap.subscribe(response => {
      if (response.get('id') == "nuevo") {
        this.adding = true;
      }
      else {
        this.getProvider(response.get('id') || "");
      }
    })
  }

  getProvider(providerId: string) {
    this._api.getProvider(providerId).subscribe({
      next: (provider) => {
        this.selectedProvider = provider
      },
      error: (error) => {
        this.selectedProvider = mockedProvider;
      }
    })
  }

  cancel() {
    this._router.navigateByUrl(`principal`, { replaceUrl: true });
  }

  saveProvider() {
    if (this.adding) {
      this._api.createProvider(this.selectedProvider).subscribe({
        next: (provider) => {
          console.log(provider);

        },
        error: (error) => {
          switch (error.status) {
            case 409:
              console.log("Duplicated");
              break;
          }
          console.log(error.status);

        },
      })
    }
    else{
      this._api.patchProvider(this.selectedProvider).subscribe({
        next: (provider) => {
          console.log(provider);
          },
        error: (error) => {
          switch (error.status) {
            case 404:
              console.log("Provider not found");
              break;
          }
          console.log(error.status);

        },
      })
    }
  }
}
