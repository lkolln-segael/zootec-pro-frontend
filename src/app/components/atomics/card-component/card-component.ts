import { Color } from '@/types/color.type';
import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-card-component',
  imports: [],
  templateUrl: './card-component.html',
  styleUrl: './card-component.css',
})
export class CardComponent {
  color = input<Color>(Color.GREEN)
  title = input<string>("")
  descripcion = input<string>("")
  comparacion = input<string>("")

  background = computed(() => {
    return "background-color: " + this.color() + ";"
  })
}
