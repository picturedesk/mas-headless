import {Directive, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[appCmpHost]',
})
export class ComponentDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
