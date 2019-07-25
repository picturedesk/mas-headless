import {Component, ComponentFactoryResolver, OnInit, Type, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Entry, EntryCollection} from 'contentful';
import {ContentfulService} from '../contentful.service';
import {ComponentDirective} from '../component.directive';
import {convertComponent} from '../helpers/helpers';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent {

  @ViewChild(ComponentDirective, {static: true}) cmpHost: ComponentDirective;

  loading = true;
  title: number;
  id: string;
  page: Entry<any>;
  pageCollection: EntryCollection<any>;

  constructor(private route: ActivatedRoute,
              private service: ContentfulService,
              private componentFactoryResolver: ComponentFactoryResolver) {
    this.id = this.route.snapshot.data.id;
    this.service.getPageCollection(this.id).then(entry => {
      this.page = entry.items[0];
      this.pageCollection = entry;
      this.title = this.page.fields.title;
      this.loadComponents();
      this.loading = false;
    });
  }

  loadComponents() {
    const viewContainerRef = this.cmpHost.viewContainerRef;
    viewContainerRef.clear();

    this.getComponentsFromCollection().forEach(component => {
      const componentFactory = this.componentFactoryResolver
        .resolveComponentFactory(convertComponent(component.sys.contentType.sys.id));
      const componentRef = viewContainerRef.createComponent(componentFactory);
      componentRef.instance.componentId = component.sys.id;
      componentRef.instance.pageCollection = this.pageCollection;
    });
  }

  private getComponentsFromCollection(): Entry<any>[] {
    const components: Entry<any>[] = [];
    if (this.page.fields.components) {
      this.page.fields.components.forEach( component => {
        components.push(
          this.pageCollection.includes.Entry.find(entry => entry.sys.id === component.sys.id)
        );
      });
    }
    return components;
  }
}
