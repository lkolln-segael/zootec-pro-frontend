import { Component, signal } from '@angular/core';
import { timer } from 'rxjs';

@Component({
  selector: 'app-home-page',
  imports: [],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css',
})
export class HomePage {
  isLoading = signal<boolean>(true)


  ngAfterViewInit() {
    timer(500).subscribe({
      next: () => {
        this.isLoading.set(false)
      }
    })
  }
}
