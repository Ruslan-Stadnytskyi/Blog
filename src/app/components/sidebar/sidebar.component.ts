import { Component, OnInit } from '@angular/core';
import {faCoffee, faUser} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
faCoffee=faCoffee
  faUser=faUser
  constructor() { }

  ngOnInit(): void {
  }

}
