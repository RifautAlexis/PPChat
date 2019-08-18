import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-search-user',
  templateUrl: './search-user.component.html',
  styleUrls: ['./search-user.component.scss']
})
export class SearchUserComponent implements OnInit {

  @Input() search: string;

  constructor() { }

  ngOnInit() {
  }

}
