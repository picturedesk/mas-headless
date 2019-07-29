import {BrowserModule} from '@angular/platform-browser';
import {APP_INITIALIZER, Injector, NgModule} from '@angular/core';
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
import { TextLinkImageComponent } from './page/text-link-image/text-link-image.component';
import { ComponentDirective } from './component.directive';
import {NgxSpinnerModule} from 'ngx-spinner';
import { HalfHalfComponent } from './page/half-half/half-half.component';
import { NeedHelpComponent } from './page/need-help/need-help.component';
import { AccordionComponent } from './page/accordion/accordion.component';
import {onAppInit} from './app.init';
import { FormComponent } from './page/form/form.component';
import { LineSpaceComponent } from './page/line-space/line-space.component';
import { TeaserDownloadComponent } from './page/teaser-download/teaser-download.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    HeaderComponent,
    LogoComponent,
    KeyVisualComponent,
    HomeComponent,
    NotFoundComponent,
    PageComponent,
    TextLinkImageComponent,
    ComponentDirective,
    HalfHalfComponent,
    NeedHelpComponent,
    AccordionComponent,
    FormComponent,
    LineSpaceComponent,
    TeaserDownloadComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgxSpinnerModule
  ],
  providers: [
    ContentfulService,
    {
    provide: APP_INITIALIZER,
    useFactory: onAppInit,
    multi: true,
    deps: [Injector]
  }],
  entryComponents: [
    HomeComponent,
    NotFoundComponent,
    PageComponent,
    TextLinkImageComponent,
    HalfHalfComponent,
    NeedHelpComponent,
    AccordionComponent,
    FormComponent,
    LineSpaceComponent,
    TeaserDownloadComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
