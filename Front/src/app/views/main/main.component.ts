// In this section I used the MVC desing as is the default workflow from angular
// Design Pattern - MVC

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
  templateUrl: 'main.component.html',
  styleUrls: ['main.component.css']
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
  ) {}

  ngAfterViewInit() {
    this.getProviders();
  }

  // List all the providers obtained by the backend
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
        // If the get fails, the system can emulate data from mock just to test other behaviours, save and remove will not be permanent
        this.providers = mockedProviders;
        this.totalProviders = mockedProviders.length.toString();
        this.configTable();
      }
    })
  }

  // Table configuratin for pagination and sorting
  configTable() {
    this.dataSource = new MatTableDataSource(this.providers);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  // Search in table
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // Go to add provider view
  addProvider() {
    this._router.navigateByUrl(`proveedor/nuevo`)
  }

  // Go to edit provider view using provider id as route
  editProvider(provider: Providers) {
    this._router.navigateByUrl(`proveedor/${provider.id}`);
  }

  // Delete provider with confirmation as is not possible to rollback
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

  // Go back to welcome window
  goBack() {
    this._router.navigateByUrl('bienvenida', { replaceUrl: true })
  }

  // Print all the data 
  printProvider() {
    this.paginator._changePageSize(1000);  
    setTimeout(() => {
      window.print();
      this.paginator._changePageSize(5);  
    }, 500);
  }
}
