import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Entry} from 'contentful';
import {ContentfulService} from '../contentful.service';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit {
  title: number;
  id: string;
  page: Entry<any>;

  constructor(private route: ActivatedRoute, private service: ContentfulService) {
    this.id = this.route.snapshot.data.id;
    this.service.getPage(this.id).then(entry => {
      this.page = entry;
      this.title = entry.fields.title;
    });
  }

  ngOnInit() {
  }

}
