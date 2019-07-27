import {Component, Input, OnInit} from '@angular/core';
import {Entry} from 'contentful';
import {CONTACT} from '../helpers/helpers';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() menus: Entry<any>[];
  contact: any;

  constructor() { }

  ngOnInit() {
    this.contact = CONTACT.route;
  }

}
