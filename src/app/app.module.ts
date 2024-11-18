import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http'; // Importa o HttpClientModule

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AngularFireModule} from '@angular/fire/compat';
import {AngularFireAuthModule} from '@angular/fire/compat/auth';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { environment } from '../environments/environment';


@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    HttpClientModule,  
    AngularFireModule, 
    AngularFireAuthModule, 
    AngularFireModule.initializeApp(environment.firebaseConfig)
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, provideFirebaseApp(() => initializeApp({"projectId":"mylibrarygame-a8d26","appId":"1:67755833332:web:d33ce21f1772777ac2aba1","storageBucket":"mylibrarygame-a8d26.appspot.com","apiKey":"AIzaSyDDx4uDgXVWWddPGYjO1pNgbH9dbgrUOTg","authDomain":"mylibrarygame-a8d26.firebaseapp.com","messagingSenderId":"67755833332","measurementId":"G-EE8TX7W0K0"})), provideAuth(() => getAuth()), provideFirestore(() => getFirestore())],
  bootstrap: [AppComponent],
})
export class AppModule {}