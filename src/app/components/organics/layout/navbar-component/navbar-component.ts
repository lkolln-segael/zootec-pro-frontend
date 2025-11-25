import { SearchService } from '@/service/search.service';
import { Component, effect, inject, model, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-navbar-component',
  imports: [FormsModule],
  templateUrl: './navbar-component.html',
  styleUrl: './navbar-component.css',
})
export class NavbarComponent {
  hide = signal<boolean>(true)
  isHidingSideBar = output<boolean>()
  search = model("")

  private readonly searchService = inject(SearchService)

  constructor() {
    effect(() => {
      this.isHidingSideBar.emit(this.hide())
      this.searchService.search(this.search())
    })
  }

  hideSideBar() {
    this.hide.update(value => !value)
  }
}
