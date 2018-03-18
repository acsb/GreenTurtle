import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { CadastroComponent } from './cadastro/cadastro.component';
import { MapaComponent } from './mapa/mapa.component';

const APP_ROUTES: Routes = [
    {path: '', component:  CadastroComponent},
    {path: 'mapa', component: MapaComponent},
];

export const routing: ModuleWithProviders = RouterModule.forRoot(APP_ROUTES);