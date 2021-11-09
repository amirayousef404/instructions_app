import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  

  sideBarOpen = false

  constructor() { }

  ngOnInit(): void { }
  
  sideBarToggler(event: any) {
    this.sideBarOpen = !this.sideBarOpen
  }

}
