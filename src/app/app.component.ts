import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ContentfulService} from './contentful.service';
import {Entry} from 'contentful';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  menus: Entry<any>[];

  constructor(private contentfulService: ContentfulService,
              private router: Router) {
    // Load Menu from Home Data-Router-Config
    this.menus = router.config.find(route => route.path === '').data.menu;
  }
}
