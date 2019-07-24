import {Component, Input, OnInit} from '@angular/core';
import {Entry, EntryCollection} from 'contentful';
import {documentToHtmlString} from '@contentful/rich-text-html-renderer';
import {Router} from '@angular/router';
import {CmpComponent} from '../cmp.component';

@Component({
  selector: 'app-text-link-image',
  templateUrl: './text-link-image.component.html',
  styleUrls: ['./text-link-image.component.scss']
})
export class TextLinkImageComponent implements OnInit {
  @Input() pageCollection: EntryCollection<any>;
  @Input() componentId: string;

  component: Entry<any>;
  title: string;
  image: string;
  text: string;
  link: string;
  linkLabel: string;
  class: string;

  constructor(private router: Router) {
  }

  ngOnInit() {
    this.component = this.resolveComponentLink(this.componentId);

    // Assign Content
    this.title = this.component.fields.title;
    this.image = this.component.fields.image ? this.resolveAssetLink(this.component.fields.image.sys.id) : null;
    this.text = documentToHtmlString(this.component.fields.text);
    this.link = this.getLink(this.component.fields);
    this.linkLabel = this.component.fields.linkLabel;

    this.class = this.image ? 'col col-md-6' : 'col';
  }

  getLink(obj: any): string {
    switch (obj) {
      case obj.externalLink:
        return obj.externalLink;
      case obj.internalDocument:
        return this.resolveAssetLink(obj.internalDocument.sys.id);
      case obj.link:
        return this.resolveInternalLink(obj.link);
      default:
        return null;
    }
  }

  private resolveComponentLink(id: string): Entry<any> {
    return this.pageCollection.includes.Entry.find(entry => entry.sys.id === id);
  }

  private resolveAssetLink(id: string): string {
    const file = this.pageCollection.includes.Asset.find(asset => asset.sys.id === id);
    return file.fields.file.url;
  }

  private resolveInternalLink(id: string): string {
    const route = this.router.config.find(item => item.data.id === id);
    return route.path;
  }
}

