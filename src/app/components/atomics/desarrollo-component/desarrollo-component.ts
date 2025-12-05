import { DesarrolloCrecimiento } from '@/types/animal.type';
import { CommonModule, DatePipe, DecimalPipe } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-desarrollo-component',
  imports: [DecimalPipe, DatePipe, CommonModule],
  templateUrl: './desarrollo-component.html',
  styleUrl: './desarrollo-component.css',
})
export class DesarrolloComponent {

  id = input<string>("")
  desarrollos = input<DesarrolloCrecimiento[]>([])
}
