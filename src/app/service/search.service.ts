import { Injectable, signal, computed } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private searchSignal = signal<string>('');

  readonly searchReadSignal = this.searchSignal.asReadonly();

  readonly isSearching = computed(() => this.searchSignal().length > 0);

  readonly validSearch = computed(() => {
    const term = this.searchSignal();
    return term.length >= 2 ? term : '';
  });

  search(value: string): void {
    this.searchSignal.set(value.trim());
  }

  clear(): void {
    this.searchSignal.set('');
  }
}
