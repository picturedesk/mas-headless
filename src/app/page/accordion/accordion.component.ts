import {Component, Input, OnInit} from '@angular/core';
import {EntryCollection} from 'contentful';
import {ContentfulService} from '../../contentful.service';
import {Router} from '@angular/router';
import {resolveInternalLinkById} from '../../helpers/helpers';
import {documentToHtmlString} from '@contentful/rich-text-html-renderer';

@Component({
  selector: 'app-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss']
})
export class AccordionComponent implements OnInit {
  @Input() pageCollection: EntryCollection<any>;
  @Input() componentId: string;
  items: any;

  constructor(private service: ContentfulService, private router: Router) {
  }

  ngOnInit() {
    this.service.getPageCollectionById(this.componentId).then(entry => {
      this.items = entry.items[0].fields.items;
    });
  }

  documentToHtmlString(text: any): any {
    return documentToHtmlString(text);
  }

}
