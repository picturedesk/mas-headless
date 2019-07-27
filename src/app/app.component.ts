import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {PageComponent} from './page/page.component';
import {ContentfulService} from './contentful.service';
import {Entry} from 'contentful';
import {CONTACT} from './helpers/helpers';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  private menus: Entry<any>[] = [];

  constructor(private contentfulService: ContentfulService, private router: Router) {
    this.contentfulService.getFirstLevelNavigation().then(
      menu => {
        this.menus = menu;
        this.generateNavigation();
      });
    this.contentfulService.getPageCollectionById(CONTACT.id).then( entry => {
        const page = entry.items[0];
        this.registerRoute(page.fields.pageName, page.sys.id);
      }
    );
  }

  private generateNavigation() {
    this.menus.forEach((childPage, index) => {
        this.menus[index].fields = {
          ...childPage.fields,
          path: childPage.fields.pageName,
          level: 1,
          hasSubMenu: !!childPage.fields.childPages
        };

        this.registerRoute(childPage.fields.pageName, childPage.sys.id);

        if (childPage.fields.childPages) {
          childPage.fields.childPages.forEach((childPage2, index2) => {
            this.menus[index].fields.childPages[index2].fields = {
              ...childPage2.fields,
              path: childPage.fields.pageName + '/' + childPage2.fields.pageName,
              level: 2,
              hasSubMenu: !!childPage2.fields.childPages
            };

            this.registerRoute(childPage.fields.pageName + '/' + childPage2.fields.pageName, childPage2.sys.id);

            if (childPage2.fields.childPages) {
              childPage2.fields.childPages.forEach((childPage3, index3) => {
                this.menus[index].fields.childPages[index2].fields.childPages[index3].fields = {
                  ...childPage3.fields,
                  path: childPage.fields.pageName + '/' + childPage2.fields.pageName + '/' + childPage3.fields.pageName,
                  level: 3
                };

                // tslint:disable-next-line:max-line-length
                this.registerRoute(childPage.fields.pageName + '/' + childPage2.fields.pageName + '/' + childPage3.fields.pageName, childPage3.sys.id);
              });
            }
          });
        }
      }
    );
  }

  private registerRoute(pageUrl: string, id: string) {
    if (this.router.config.filter(route => route.path === pageUrl).length === 0) {
      this.router.config.unshift(
        { path: pageUrl, component: PageComponent, data: { id } }
      );
    }
  }
}
