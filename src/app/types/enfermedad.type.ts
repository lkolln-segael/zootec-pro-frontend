import { Animal, TipoAnimal } from "./animal.type";

export type TipoEnfermedad = {
  id?: string;
  nombre: string;
  sintomas: Sintoma[],
  tratamientos: Tratamientos[],
  tipoAnimales: TipoAnimal
}

export type Sintoma = {
  id: string;
  nombre: string;
  descripcion: string
}

export type Tratamientos = {
  id: string;
  nombre: string;
  descripcion: string;
}

export type Tratamiento = {
  id: string,
  nombre: string,
  tipoTratamiento: Tratamientos
}

export type EnfermedadData = {
  animalId: string,
  tipoEnfermedadId: string;
  sintomasIds: string[],
  tratamientosIds: string[],
  fechaRegistro: string
}

export type Enfermedad = {
  id: string;
  nombre: string;
  tipoEnfermedad: TipoEnfermedad,
  tratamientos: Tratamiento[],
  animal: Animal;
  fechaRegistro: string;
}
