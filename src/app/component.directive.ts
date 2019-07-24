import {Directive, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[cmp-host]',
})
export class ComponentDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
