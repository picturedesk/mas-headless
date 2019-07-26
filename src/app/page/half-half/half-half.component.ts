import {Component, Input, OnInit} from '@angular/core';
import {EntryCollection} from 'contentful';

@Component({
  selector: 'app-half-half',
  templateUrl: './half-half.component.html',
  styleUrls: ['./half-half.component.scss']
})
export class HalfHalfComponent implements OnInit {
  @Input() pageCollection: EntryCollection<any>;
  @Input() componentId: string;

  leftId: string;
  rightId: string;

  constructor() {
  }

  ngOnInit() {
    this.leftId = this.pageCollection.includes.Entry.find(entry => entry.sys.id === this.componentId).fields.left.sys.id;
    this.rightId = this.pageCollection.includes.Entry.find(entry => entry.sys.id === this.componentId).fields.right.sys.id;
  }

}
