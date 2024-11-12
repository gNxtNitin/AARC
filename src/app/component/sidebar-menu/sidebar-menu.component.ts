import { Component, OnInit, Renderer2 } from '@angular/core';
import { DataSharingService } from 'src/app/service/data-sharing.service';

@Component({
  selector: 'app-sidebar-menu',
  templateUrl: './sidebar-menu.component.html',
  styleUrls: ['./sidebar-menu.component.scss']
})
export class SidebarMenuComponent implements OnInit {

  isInitalView = true;
  loggedInUser:any;

  constructor(private renderer: Renderer2,
    private dataSharingService: DataSharingService) {
  }

  ngOnInit(): void {
    this.loggedInUser = this.dataSharingService.loggedInUser;
    this.dataSharingService.loggedUser.subscribe((response:any) => {
      this.loggedInUser = response;
    })
  }

  reloadPage()
  {
    window.location.reload();
  }
  toggleSideBar()
  {
    console.log('toggle');
    this.isInitalView = !this.isInitalView;
    var classToAdd = this.isInitalView?'nav-md':'nav-sm';
    var classToRemove = this.isInitalView?'nav-sm':'nav-md';
    this.renderer.addClass(document.body, classToAdd);
    this.renderer.removeClass(document.body, classToRemove);
  }
}
