import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule }   from '@angular/forms';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { NotesListComponent } from './components/notes-list/notes-list.component';
import { JQ_TOKEN } from './common/jquery.service';
import { environment } from 'src/environments/environment';
import { AuthService } from './services/auth.service';
import { LoginComponent } from './components/login/login.component';
import { LocalStorageModule } from 'angular-2-local-storage';
import { CreateNoteComponent } from './components/create-note/create-note.component';
import { NotesService } from './services/notes.service';

let jQuery = window['$'];

@NgModule({
  declarations: [
    AppComponent,
    NotesListComponent,
    LoginComponent,
    CreateNoteComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    LocalStorageModule.forRoot({ storageType: 'localStorage' })
  ],
  providers: [
    { provide: JQ_TOKEN, useValue: jQuery },
    AuthService,
    NotesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
