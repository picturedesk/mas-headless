import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ContentfulService} from './contentful.service';
import { generateNavigation } from './helpers/helpers';
import { NgxSpinnerService } from 'ngx-spinner';
import {Entry} from 'contentful';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  menus: Entry<any>[];

  constructor(private contentfulService: ContentfulService,
              private router: Router,
              private spinner: NgxSpinnerService) {
    this.menus = router.config.find(route => route.path === '').data.menu;
  }

  ngOnInit() {
    this.spinner.show();
  }
}
