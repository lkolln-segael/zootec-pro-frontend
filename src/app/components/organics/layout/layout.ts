import { Component, signal } from '@angular/core';
import { RouterOutlet } from "@angular/router";
import { NavbarComponent } from "./navbar-component/navbar-component";
import { SidebarComponent } from "./sidebar-component/sidebar-component";

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, NavbarComponent, SidebarComponent],
  templateUrl: './layout.html',
  styleUrl: './layout.css',
})
export class Layout {

  hideSideBar = signal<boolean>(false)

  handleSideBar(value: boolean) {
    this.hideSideBar.set(value)
  }
}
