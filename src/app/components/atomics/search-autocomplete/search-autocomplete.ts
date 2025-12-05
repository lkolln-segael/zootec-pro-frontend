import { Component, input, model, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-autocomplete',
  imports: [FormsModule],
  templateUrl: './search-autocomplete.html',
  styleUrl: './search-autocomplete.css',
})
export class SearchAutocomplete {

  suggestions = input<string[]>([])
  placeholder = input<string>("")

  search = output<string>()
  selected = output<string>()

  searchTerm = model("")

  showSuggestions = signal<boolean>(false)
  filteredSuggestions = signal<string[]>([])


  onInputChange() {
    this.showSuggestions.set(true)
    if (this.suggestions().length > 0) {
      this.filteredSuggestions.set(this.suggestions().filter(
        s => s.toLowerCase().includes(this.searchTerm().toLowerCase())
      ))
    }
    else {
      this.filteredSuggestions.set([])
    }
  }

  onSearch() {
    this.search.emit(this.searchTerm())
    this.showSuggestions.set(false)
  }
  onBlur() {
    setTimeout(() => {
      this.showSuggestions.set(false)
    }, 200)
  }

  onSelectSuggestion(suggestion: string) {
    this.searchTerm.set(suggestion)
    this.showSuggestions.set(false)
    this.selected.emit(suggestion)
  }
}
