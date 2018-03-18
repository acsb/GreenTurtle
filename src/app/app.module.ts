import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';


import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { CadastroComponent } from './cadastro/cadastro.component';

import { FormsModule } from '@angular/forms'
import { FirebaseConfig } from './../environments/firebase.config';
import { AngularFireModule } from 'angularfire2/index';
import { AngularFireDatabase, AngularFireDatabaseModule } from 'angularfire2/database';
import { MapaComponent } from './mapa/mapa.component';
import { routing } from './app.routes';
import { AngularFireAuth } from 'angularfire2/auth';
import { AgmCoreModule } from '@agm/core';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CadastroComponent,
    MapaComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
    AngularFireModule.initializeApp(FirebaseConfig),
    AngularFireDatabaseModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDiW_5s6KJhr2xo18XTsyjRO84HEjvr7Yc'
    })
  ],
  providers: [AngularFireDatabase, AngularFireAuth],
  bootstrap: [AppComponent]
})
export class AppModule { }
