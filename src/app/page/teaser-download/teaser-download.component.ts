import {Component, Input, OnInit} from '@angular/core';
import {Entry, EntryCollection} from 'contentful';
import {ContentfulService} from '../../contentful.service';

@Component({
  selector: 'app-teaser-download',
  templateUrl: './teaser-download.component.html',
  styleUrls: ['./teaser-download.component.scss']
})
export class TeaserDownloadComponent implements OnInit {
  @Input() pageCollection: EntryCollection<any>;
  @Input() componentId: string;
  files: Entry<any>[];
  title: string;

  constructor(private service: ContentfulService) { }

  ngOnInit() {
    this.service.resolveComponentLink(this.componentId, this.pageCollection).then(component => {
      this.title = component.fields.title;
      this.files = component.fields.files;
    });
  }

}
