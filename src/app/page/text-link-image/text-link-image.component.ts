import {Component, Input, OnInit} from '@angular/core';
import {Entry, EntryCollection} from 'contentful';
import {documentToHtmlString} from '@contentful/rich-text-html-renderer';
import {Router} from '@angular/router';
import {resolveComponentLink, resolveInternalLinkById} from '../../helpers/helpers';

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
  linkExternal: string;
  linkLabel: string;
  class: string;

  constructor(private router: Router) { }

  ngOnInit() {
    resolveComponentLink(this.componentId, this.pageCollection).then(component => {
      this.title = component.fields.title ? component.fields.title : null;
      this.image = component.fields.image ? this.resolveAssetLink(component.fields.image.sys.id) : null;
      this.text = documentToHtmlString(component.fields.text);
      this.linkExternal = this.getLink(component.fields);
      this.link = component.fields.link && !this.linkExternal ? resolveInternalLinkById(component.fields.link.sys.id, this.router) : null;
      this.linkLabel = component.fields.linkLabel;

      this.class = this.image ? 'col col-md-6' : 'col';
    });
  }

  getLink(obj: any): string | null {
    if (obj.externalLink) {
      return obj.externalLink;
    } else if (obj.internalDocument) {
      return this.resolveAssetLink(obj.internalDocument.sys.id);
    } else {
      return null;
    }
  }

  private resolveAssetLink(id: string): string {
    const file = this.pageCollection.includes.Asset.find(asset => asset.sys.id === id);
    return file.fields.file.url;
  }

  handleLink() {
    if (this.linkExternal) {
      window.location.href = this.linkExternal;
    } else {
      this.router.navigate([this.link]);
    }
  }
}

