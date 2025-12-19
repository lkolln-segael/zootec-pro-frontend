import { SearchAutocomplete } from '@/components/atomics/search-autocomplete/search-autocomplete';
import { AnimalService } from '@/service/animal.service';
import { EnfermedadService } from '@/service/enfermedad.service';
import { Animal } from '@/types/animal.type';
import { EnfermedadData, TipoEnfermedad } from '@/types/enfermedad.type';
import { Component, computed, effect, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-enfermedades',
  standalone: true,
  imports: [SearchAutocomplete, FormsModule],
  templateUrl: './enfermedades.html',
  styleUrl: './enfermedades.css',
})
export class Enfermedades {
  animalService = inject(AnimalService);
  enfermedadService = inject(EnfermedadService);
  toastrService = inject(ToastrService)

  // Señales principales
  animales = signal<Animal[]>([]);
  tipoEnfermedadSelectedId = signal<string>("");
  animalSelectedId = signal<string>("");
  tipoEnfermedades = signal<TipoEnfermedad[]>([]);

  // Señales para arrays dinámicos
  sintomasSeleccionados = signal<Array<{ id: string, nombre?: string }>>([]);
  tratamientosSeleccionados = signal<Array<{ id: string, nombre?: string }>>([]);

  // Señales para inputs temporales
  sintomaTemporalId = signal<string>("");
  tratamientoTemporalId = signal<string>("");

  uploading = signal(false)

  suggestions = computed(() => {
    return this.animales().map(a => a.codigo);
  })

  tipoEnfermedadSelected = computed(() => {
    return this.tipoEnfermedades().find(t => t.id === this.tipoEnfermedadSelectedId());
  });

  // Listas disponibles para seleccionar
  sintomasDisponibles = computed(() => {
    if (!this.tipoEnfermedadSelected()) return [];
    const seleccionados = this.sintomasSeleccionados().map(s => s.id);
    return this.tipoEnfermedadSelected()!.sintomas?.filter(s => !seleccionados.includes(s.id)) || [];
  });

  tratamientosDisponibles = computed(() => {
    if (!this.tipoEnfermedadSelected()) return [];
    const seleccionados = this.tratamientosSeleccionados().map(t => t.id);
    return this.tipoEnfermedadSelected()!.tratamientos?.filter(t => !seleccionados.includes(t.id)) || [];
  });

  constructor() {
    effect(() => {
      console.log('Síntomas seleccionados:', this.sintomasSeleccionados());
      console.log('Tratamientos seleccionados:', this.tratamientosSeleccionados());
    });
  }

  ngOnInit() {
    const establoId = localStorage.getItem("establoId");
    if (establoId) {
      this.animalService.getAnimales(establoId)
        .subscribe({
          next: (res) => {
            this.animales.set(res.data || []);
          },
          error: (err) => {
            console.error('Error al cargar animales:', err);
          }
        });
    }

    this.enfermedadService.getTipoEnfermedades()
      .subscribe({
        next: (res) => {
          this.tipoEnfermedades.set(res || []);
        },
        error: (err) => {
          console.error('Error al cargar tipos de enfermedad:', err);
        }
      });
  }

  onSearch(search: string) {
    const animal = this.animales().find(animal => animal.codigo === search)
    if (!animal) {
      return
    }
    this.animalSelectedId.set(animal.id)
  }

  // Métodos para síntomas
  agregarSintoma() {
    if (!this.sintomaTemporalId()) {
      alert('Por favor seleccione un síntoma');
      return;
    }

    const sintoma = this.tipoEnfermedadSelected()?.sintomas?.find(s => s.id === this.sintomaTemporalId());
    if (sintoma) {
      this.sintomasSeleccionados.update(sintomas => [...sintomas, {
        id: sintoma.id,
        nombre: sintoma.nombre
      }]);
      this.sintomaTemporalId.set(""); // Resetear el select
    }
  }

  eliminarSintoma(index: number) {
    this.sintomasSeleccionados.update(sintomas =>
      sintomas.filter((_, i) => i !== index)
    );
  }

  // Métodos para tratamientos
  agregarTratamiento() {
    if (!this.tratamientoTemporalId()) {
      alert('Por favor seleccione un tratamiento');
      return;
    }

    const tratamiento = this.tipoEnfermedadSelected()?.tratamientos?.find(t => t.id === this.tratamientoTemporalId());
    if (tratamiento) {
      this.tratamientosSeleccionados.update(tratamientos => [...tratamientos, {
        id: tratamiento.id,
        nombre: tratamiento.nombre || `Tratamiento ${tratamiento.id}`
      }]);
      this.tratamientoTemporalId.set(""); // Resetear el select
    }
  }

  eliminarTratamiento(index: number) {
    this.tratamientosSeleccionados.update(tratamientos =>
      tratamientos.filter((_, i) => i !== index)
    );
  }

  // Limpiar todo cuando cambia el tipo de enfermedad
  onTipoEnfermedadChange() {
    this.sintomasSeleccionados.set([]);
    this.tratamientosSeleccionados.set([]);
    this.sintomaTemporalId.set("");
    this.tratamientoTemporalId.set("");
  }

  registrarEnfermedad() {
    if (this.sintomasSeleccionados().length === 0) {
      alert('Debe agregar al menos un síntoma');
      return;
    }

    if (this.tratamientosSeleccionados().length === 0) {
      alert('Debe agregar al menos un tratamiento');
      return;
    }
    this.uploading.set(true)
    const enfermedadData: EnfermedadData = {
      animalId: this.animalSelectedId(),
      tipoEnfermedadId: this.tipoEnfermedadSelectedId(),
      sintomasIds: this.sintomasSeleccionados().map(s => s.id),
      tratamientosIds: this.tratamientosSeleccionados().map(t => t.id),
      fechaRegistro: new Date().toISOString()
    };

    // Aquí llamarías al servicio para guardar la enfermedad
    this.enfermedadService.crearEnfermedad(enfermedadData).subscribe({
      next: (res) => {
        this.uploading.set(false)
        this.toastrService.success("Enfermedad registrada con exito")
      }
    });
    // Resetear formulario
    this.resetForm();
  }

  resetForm() {
    this.tipoEnfermedadSelectedId.set("");
    this.sintomasSeleccionados.set([]);
    this.tratamientosSeleccionados.set([]);
    this.sintomaTemporalId.set("");
    this.tratamientoTemporalId.set("");
  }
}
