import {Component, ElementRef, HostListener, Input, ViewChild} from '@angular/core';
import {Entry} from 'contentful';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {

  @Input() menus: Entry<any>[];

  @ViewChild('navigation', {static: false})
  navigation: ElementRef;

  open(event: Event) {
    // @ts-ignore
    const parent = event.target.parentNode;

    if (parent.className.search('dropdown-submenu') > 0) {
      event.preventDefault();
      event.stopPropagation();
      this.removeOpenClasses();
      parent.classList.add('open');
    }
  }

  @HostListener('document:click')
  removeOpenClasses() {
    this.navigation.nativeElement.querySelectorAll('li.nav-item').forEach(element => {
      element.classList.remove('open');
    });
  }
}
