import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideFirebaseApp(() => initializeApp({"projectId":"deskline21-92d3d","appId":"1:181972047362:web:4089a513d5cf1558f3f91b","storageBucket":"deskline21-92d3d.firebasestorage.app","apiKey":"AIzaSyA5YOQlltamI0jlWLcELqxc6qYqqkl3VSw","authDomain":"deskline21-92d3d.firebaseapp.com","messagingSenderId":"181972047362","measurementId":"G-2EL7PMBKW5",})), provideAuth(() => getAuth()), provideFirestore(() => getFirestore())]
};
