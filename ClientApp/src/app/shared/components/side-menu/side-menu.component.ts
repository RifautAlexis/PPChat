import { Component, OnInit } from '@angular/core';
declare var M: any;

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    const elem = document.querySelector('.sidenav');
    const options = {};
    M.Sidenav.init(elem, options);
  }

}
