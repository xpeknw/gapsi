// Design Pattern - Factory

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../utils/network/api';
import { Providers } from '../../../utils/models/provider';
import { mockedProvider } from '../../../../environments/environment.prod';
import { ProviderFactory } from '../../../utils/models/provider';
import { Utils } from '../../../utils/utils';

@Component({
  templateUrl: 'providers.component.html'
})
export class ProvidersComponent implements OnInit {
  providerId = "";
  adding: boolean = false;
  selectedProvider!: Providers;
  constructor(
    private _router: Router,
    private _api: ApiService,
    private _activatedRoute: ActivatedRoute,
    private _utils: Utils
  ) {
    this.selectedProvider = ProviderFactory.createProvider();
  }

  // Gather id from url to create new provider or get the provider information by id
  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe(response => {
      if (response.get('id') === 'nuevo') {
        this.adding = true;
        this.selectedProvider = ProviderFactory.createProvider();
      } else {
        this.adding = false;
        this.getProvider(response.get('id') || '');
      }
    });
  }

  // Get the provider information by id
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


  // Initiate Saving process with simple validations of data
  saveProvider() {
    // If it is adding should contain the 3 input filled
    if (this.adding) {
      if (!this.selectedProvider.name) {
        this._utils.launchMessage("Alerta", "Es necesario introducir un nombre.", "", false).then(() => {
          document.getElementById('name')?.focus();
        })
      }
      else if (!this.selectedProvider.trade_name) {
        this._utils.launchMessage("Alerta", "Es necesario introducir la razón social", "", false).then(() => {
          document.getElementById('trade_name')?.focus();
        })
      }
      else if (!this.selectedProvider.address) {
        this._utils.launchMessage("Alerta", "Es necesario introducir una dirección.", "", false).then(() => {
          document.getElementById('address')?.focus();
        })
      }
      else {
        // If the trade name is already registered will advice about it, otherwise the new data will be saved
        this._api.createProvider(this.selectedProvider).subscribe({
          next: (provider) => {
            this._utils.launchMessage("Alerta", "Registro Creado correctamente.", "", false).then(() => {
              this.cancel();
            });
          },
          error: (error) => {
            switch (error.status) {
              case 409:
                this._utils.launchMessage("Alerta", "Ya se encuentra un registro con la misma Razón Social.", "", false)
                break;
            }
          },
        })
      }
    }
    else {
      // If it is editing will try to update, in a weird case that the provider does not exist the system will advice about it
      this._api.patchProvider(this.selectedProvider).subscribe({
        next: (provider) => {
          this._utils.launchMessage("Alerta", "Registro Actualizado correctamente.", "", false).then(() => {
            this.cancel();
          });
        },
        error: (error) => {
          switch (error.status) {
            case 404:
              this._utils.launchMessage("Alerta", "Registro no actualizado ya que no se encontró.", "", false)
              break;
          }
        }
      })
    }
  }

  // Go back to main windows
  cancel() {
    this._router.navigateByUrl(`principal`, { replaceUrl: true });
  }
}
