import {Component, OnInit} from '@angular/core';
import {SessionStorageService} from 'ngx-webstorage';

/* tslint:disable:component-selector */
@Component({
  selector: '[app-root]',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.css']
})
export class RootComponent implements OnInit {
  show = false;

  constructor(
    private sessionStorageService: SessionStorageService) {
    if (this.sessionStorageService.retrieve('user') != null) {
      // console.log('hi from root');
      this.show = true;
    }
  }

  ngOnInit(): void {
  }

}
