import {Type} from '@angular/core';
import {TextLinkImageComponent} from '../page/text-link-image/text-link-image.component';
import {HalfHalfComponent} from '../page/half-half/half-half.component';
import {NeedHelpComponent} from '../page/need-help/need-help.component';
import {Icon} from '../model/client.model';
import {Entry, EntryCollection} from 'contentful';
import {Router} from '@angular/router';

export const CONFIG = {
  space: '4ku70rkuyzwa',
  accessToken: '7eMyhfv0zCbS6Mv5sKoSPz4EwwiM_UTqHRUA1fEEAeM',

  contentTypeIds: {
    overviewPage: '28Ep5txTOUmKycEnzl3Cwi'
  }
};

export const CONTACT = {id: '6q5WiWtgch56PcBP0MajaL', route: 'kontakt'};

export function convertComponent(type: string): Type<any> {
  switch (type) {
    case 'textImage':
      return TextLinkImageComponent;
    case 'halfHalf':
      return HalfHalfComponent;
    case 'needHelp':
      return NeedHelpComponent;
    default:
      return TextLinkImageComponent;
  }
}

export function getIcons(): Icon[] {
  return [{
    file: 'email',
    type: 'email'
  }, {
    file: 'phone',
    type: 'phone'
  }, {
    file: 'bill',
    type: 'bill'
  }] as Icon[];
}


export async function resolveComponentLink(id: string, pageCollection: EntryCollection<any>): Promise<Entry<any>> {
  let component = pageCollection.includes.Entry.find(entry => entry.sys.id === id);
  if (!component) {
    await this.service.getPageCollectionById(id).then(entry => {
      component = entry.items[0];
    });
  }
  return component;
}

export function resolveInternalLinkById(id: string, router: Router): string {
  const route = router.config.find(item => item.data.id === id);
  return route.path;
}
