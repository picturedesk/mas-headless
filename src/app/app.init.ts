import { Injector } from '@angular/core';
import { Router } from '@angular/router';
import {generateNavigation, registerRoute} from './helpers/helpers';
import {ContentfulService} from './contentful.service';
import {PageComponent} from './page/page.component';
import {CONFIG, CONTACT} from './helpers/config';

export function onAppInit(injector: Injector): () => Promise<any> {
  return (): Promise<any> => {
    return new Promise(async (resolve) => {
      const router = injector.get(Router);
      const contentfulService = injector.get(ContentfulService);

      await contentfulService.getFirstLevelNavigation().then(
        menu => {
          generateNavigation(menu, router);
          // Add Menu to Hove Route
          router.config.unshift(
            {
              path: '',
              component: PageComponent,
              data: {
                menu,
                id: CONFIG.contentTypeIds.overviewPage
              }
            }
          );
        });

      await contentfulService.getPageCollectionById(CONTACT.id).then(entry => {
          const page = entry.items[0];
          registerRoute(page.fields.pageName, page.sys.id, router);
        }
      );

      resolve();
    });
  };
}
