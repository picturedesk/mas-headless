import {Type} from '@angular/core';
import {TextLinkImageComponent} from '../page/text-link-image/text-link-image.component';
import {HalfHalfComponent} from '../page/half-half/half-half.component';
import {NeedHelpComponent} from '../page/need-help/need-help.component';
import {Icon} from '../model/client.model';
import {Entry} from 'contentful';
import {Router} from '@angular/router';
import {AccordionComponent} from '../page/accordion/accordion.component';
import {PageComponent} from '../page/page.component';
import {FormComponent} from '../page/form/form.component';
import {LineSpaceComponent} from '../page/line-space/line-space.component';
import {TeaserDownloadComponent} from '../page/teaser-download/teaser-download.component';

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
    case 'form':
      return FormComponent;
    case 'lineSpace':
      return LineSpaceComponent;
    case 'teaserDownload':
      return TeaserDownloadComponent;
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
            // tslint:disable-next-line:max-line-length
            hasSubMenu: !!childPage2.fields.childPages && childPage2.fields.childPages.filter(page => !page.fields.hideInNavigation).length > 0
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
