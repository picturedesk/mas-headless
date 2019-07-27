import {Type} from '@angular/core';
import {TextLinkImageComponent} from '../page/text-link-image/text-link-image.component';
import {HalfHalfComponent} from '../page/half-half/half-half.component';
import {NeedHelpComponent} from '../page/need-help/need-help.component';
import {Icon} from '../model/client.model';
import {Entry, EntryCollection} from 'contentful';
import {Router} from '@angular/router';
import {AccordionComponent} from '../page/accordion/accordion.component';
import {PageComponent} from '../page/page.component';

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
    case 'accordion':
      return AccordionComponent;
    default:
      return TextLinkImageComponent;
  }
}

export function getIcons(): Icon[] {
  return [{
    file: 'email.png',
    type: 'email'
  }, {
    file: 'phone.png',
    type: 'phone'
  }, {
    file: 'bill.png',
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

export function registerRoute(pageUrl: string, id: string, router: Router) {
  if (router.config.filter(route => route.path === pageUrl).length === 0) {
    router.config.unshift(
      { path: pageUrl, component: PageComponent, data: { id } }
    );
  }
}

export function generateNavigation(menu: Entry<any>[], router: Router) {
  menu.forEach((childPage, index) => {
      menu[index].fields = {
        ...childPage.fields,
        path: childPage.fields.pageName,
        level: 1,
        hasSubMenu: !!childPage.fields.childPages
      };

      registerRoute(childPage.fields.pageName, childPage.sys.id, router);

      if (childPage.fields.childPages) {
        childPage.fields.childPages.forEach((childPage2, index2) => {
          menu[index].fields.childPages[index2].fields = {
            ...childPage2.fields,
            path: childPage.fields.pageName + '/' + childPage2.fields.pageName,
            level: 2,
            hasSubMenu: !!childPage2.fields.childPages
          };

          registerRoute(childPage.fields.pageName + '/' + childPage2.fields.pageName, childPage2.sys.id, router);

          if (childPage2.fields.childPages) {
            childPage2.fields.childPages.forEach((childPage3, index3) => {
              menu[index].fields.childPages[index2].fields.childPages[index3].fields = {
                ...childPage3.fields,
                path: childPage.fields.pageName + '/' + childPage2.fields.pageName + '/' + childPage3.fields.pageName,
                level: 3
              };

              // tslint:disable-next-line:max-line-length
              registerRoute(childPage.fields.pageName + '/' + childPage2.fields.pageName + '/' + childPage3.fields.pageName, childPage3.sys.id, router);
            });
          }
        });
      }
    }
  );
}
