import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from "@angular/router";
import { NavbarComponent } from "./navbar-component/navbar-component";
import { SidebarComponent } from "./sidebar-component/sidebar-component";
import { UserService } from '@/service/user.service';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, NavbarComponent, SidebarComponent],
  templateUrl: './layout.html',
  styleUrl: './layout.css',
})
export class Layout {

  hideSideBar = signal<boolean>(false)

  authority = signal("")

  private userService = inject(UserService)

  ngOnInit() {
    if (this.userService.isAdminAuthenticated()) {
      this.authority.set("ADMIN")
    }
    if (this.userService.isOperarioAuthenticated()) {
      this.authority.set("OPERARIO")
    }
    if (this.userService.isVeterinarioAuthenticated()) {
      this.authority.set("VETERINARIO")
    }
  }

  handleSideBar(value: boolean) {
    this.hideSideBar.set(value)
  }
}
