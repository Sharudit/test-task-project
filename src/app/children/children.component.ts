import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-children',
  templateUrl: './children.component.html',
  styleUrls: ['./children.component.scss']
})
export class ChildrenComponent implements OnInit {
  @Input() children;

  constructor() {
  }

  ngOnInit() {
  }

  // first level files counting
  filesCount(item) {
    return item.children && item.children.filter(x => x.type === 'file').length;
  }
  // recursive files counting
  allFilesCount(item) {
    let count = 0;
    if (item.children) {
      item.children.forEach(x => count += x.children ? this.allFilesCount(x) : 1);
    }
    return count;
  }

  selectItem(event, item) {
    event.stopPropagation();
    item.selectFlag = !item.selectFlag;
  }
}
