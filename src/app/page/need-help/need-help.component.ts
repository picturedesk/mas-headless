import {Component, Input, OnInit} from '@angular/core';
import {EntryCollection} from 'contentful';
import {ContentfulService} from '../../contentful.service';
import {documentToHtmlString} from '@contentful/rich-text-html-renderer';
import {INLINES} from '@contentful/rich-text-types';
import {resolveInternalLinkById} from '../../helpers/helpers';
import {Router} from '@angular/router';

@Component({
  selector: 'app-need-help',
  templateUrl: './need-help.component.html',
  styleUrls: ['./need-help.component.scss']
})
export class NeedHelpComponent implements OnInit {
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
    const options = {
      renderNode: {
        // tslint:disable-next-line:max-line-length
        [INLINES.ENTRY_HYPERLINK]: (node) => {
          const link = resolveInternalLinkById(node.data.target.sys.id, this.router);
          return `<a href="${link}">${node.content[0].value}</a>`;
        }
      }
    };
    return documentToHtmlString(text, options).replace(/(?:\r\n|\r|\n)/g, '<br>');
  }
}
