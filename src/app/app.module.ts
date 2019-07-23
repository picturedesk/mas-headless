import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
// HttpClient module for RESTful API
import {HttpClientModule} from '@angular/common/http';
// Routing module for router service
import {AppRoutingModule} from './app-routing.module';
// Forms module
import {FormsModule} from '@angular/forms';
// Components
import {NavigationComponent} from './navigation/navigation.component';
import {ContentfulService} from './contentful.service';
import { HeaderComponent } from './header/header.component';
import { LogoComponent } from './logo/logo.component';
import { KeyVisualComponent } from './key-visual/key-visual.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { PageComponent } from './page/page.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    HeaderComponent,
    LogoComponent,
    KeyVisualComponent,
    HomeComponent,
    NotFoundComponent,
    PageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [ContentfulService],
  entryComponents: [
    HomeComponent,
    NotFoundComponent,
    PageComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
