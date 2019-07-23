import { Injectable } from '@angular/core';
import {createClient, Entry} from 'contentful';
import {CONFIG} from './helpers/helpers';
import {Menu} from './client.model';

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

  getPage(id: string): Promise<Entry<any>> {
    return this.cdaClient.getEntry(id);
  }
}

