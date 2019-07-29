import { Injectable } from '@angular/core';
import {createClient, Entry, EntryCollection} from 'contentful';
import {CONFIG} from './helpers/config';

@Injectable({
  providedIn: 'root'
})
export class ContentfulService {

  private cdaClient = createClient({
    space: CONFIG.space,
    accessToken: CONFIG.accessToken
  });

  constructor() {
  }

  getFirstLevelNavigation(): Promise<Entry<any>[]> {
    return this.cdaClient.getEntries({
      content_type: 'overviewPage'
    }).then(entry => {
      const childPages = entry.items.filter(item => item.sys.id === '28Ep5txTOUmKycEnzl3Cwi');
      // @ts-ignore
      return childPages[0].fields.childPages;
    });
  }

  getPageCollectionById(id: string): Promise<EntryCollection<any>> {
    return this.cdaClient.getEntries({
      'sys.id': id
    });
  }

  getPageCollectionByPageName(pageName: string): Promise<EntryCollection<any>> {
    return this.cdaClient.getEntries({
      'fields.pageName': pageName
    });
  }

  async resolveComponentLink(id: string, pageCollection: EntryCollection<any>): Promise<Entry<any>> {
    let component = pageCollection.includes.Entry.find(entry => entry.sys.id === id);
    if (!component) {
      await this.getPageCollectionById(id).then(entry => {
        component = entry.items[0];
      });
    }
    return component;
  }
}

