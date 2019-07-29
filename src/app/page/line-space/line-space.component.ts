import {Component, Input, OnInit} from '@angular/core';
import {Entry, EntryCollection} from 'contentful';
import {ContentfulService} from '../../contentful.service';

@Component({
  selector: 'app-line-space',
  templateUrl: './line-space.component.html',
  styleUrls: ['./line-space.component.scss']
})
export class LineSpaceComponent implements OnInit {
  @Input() pageCollection: EntryCollection<any>;
  @Input() componentId: string;
  showLine: boolean;

  constructor(private service: ContentfulService) {
  }

  ngOnInit() {
    this.resolveComponentLink(this.componentId, this.pageCollection).then(component => {
      this.showLine = !!component.fields.showLine;
    });
  }

  async resolveComponentLink(id: string, pageCollection: EntryCollection<any>): Promise<Entry<any>> {
    let component = pageCollection.includes.Entry.find(entry => entry.sys.id === id);
    if (!component) {
      await this.service.getPageCollectionById(id).then(entry => {
        component = entry.items[0];
      });
    }
    return component;
  }
}
