import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../utils/network/api';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Providers } from '../../utils/models/provider';
import { MatSort } from '@angular/material/sort';
import { mockedProviders } from '../../../environments/environment.prod';
import { Utils } from '../../utils/utils';


@Component({
  templateUrl: 'main.component.html'
})
export class MainComponent implements AfterViewInit {
  @ViewChild(MatSort)
  sort!: MatSort;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  dataSource!: MatTableDataSource<Providers>;

  displayedColumns: string[] = ["name", "trade_name", "address", "edit", "delete"];
  providers: Providers[] = []
  totalProviders = "0";
  constructor(
    private _router: Router,
    private _api: ApiService,
    private _utils: Utils
  ) {
  }

  ngAfterViewInit() {
    this.getProviders();
  }

  getProviders() {
    this._api.getProvidersData().subscribe({
      next: (providersData) => {
        if (providersData && providersData.total) {
          this.totalProviders = providersData.total;
        }
        if (providersData && providersData.items && providersData.items.length > 0) {
          this.providers = providersData.items;
          this.configTable();
        }
      },
      error: (error) => {
        this.providers = mockedProviders;
        this.totalProviders = mockedProviders.length.toString();
        this.configTable();
      }
    })
  }

  configTable() {
    this.dataSource = new MatTableDataSource(this.providers);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  addProvider() {
    this._router.navigateByUrl(`proveedor/nuevo`)
  }

  editProvider(provider: Providers) {
    this._router.navigateByUrl(`proveedor/${provider.id}`);
  }

  deleteProvider(provider: Providers) {
    this._utils.launchMessage("Alerta", `Estas seguro de querer eliminar al proveedor "${provider.name} - ${provider.trade_name}".\nEsta acción es irreversible.`, "danger").then(res => {
      if (res.isConfirmed) {
        this._api.deleteProvider(provider).subscribe({
          next: () => {
            this._utils.launchMessage("Alerta", "Registro eliminado correctamente.", "", false).then(() => {
              this.getProviders();
            });
          },
          error: (error) => {
            console.log(error);
          },
        })
      }
    });
  }

  goBack() {
    this._router.navigateByUrl('bienvenida', { replaceUrl: true })
  }
  printProvider() {

  }
}
