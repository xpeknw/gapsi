import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'bienvenida',
    pathMatch: 'full',
  },
  {
    path: 'bienvenida',
    loadChildren: () => import('./views/welcome/welcome.module').then(m => m.WelcomeModule)
  },
  {
    path: 'principal',
    loadChildren: () => import('./views/main/main.module').then(m => m.MainModule)
  },
  {
    path: 'proveedor/:id',
    loadChildren: () => import('./views/main/providers/providers.module').then(m => m.ProvidersModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
