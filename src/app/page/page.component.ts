import {Component, ComponentFactoryResolver, OnInit, Type, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Entry, EntryCollection} from 'contentful';
import {ContentfulService} from '../contentful.service';
import {ComponentDirective} from '../component.directive';
import {CmpComponent} from './cmp.component';
import {convertComponent} from '../helpers/helpers';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit {

  @ViewChild(ComponentDirective, {static: true}) cmpHost: ComponentDirective;

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
      this.title = entry.items[0].fields.title;
      this.loadComponent();
    });
  }

  ngOnInit() {
  }

  loadComponent() {
    const component = convertComponent('textImage');
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);

    const viewContainerRef = this.cmpHost.viewContainerRef;
    viewContainerRef.clear();

    const componentRef = viewContainerRef.createComponent(componentFactory);
    componentRef.instance.componentId = this.pageCollection.items[0].fields.components[0].sys.id;
    componentRef.instance.pageCollection = this.pageCollection;
  }
}
