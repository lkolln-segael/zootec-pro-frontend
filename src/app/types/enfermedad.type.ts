import { TipoAnimal } from "./animal.type";

export type TipoEnfermedad = {
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

