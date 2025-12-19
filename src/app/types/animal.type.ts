export type TipoAnimal = {
  id: string;
  nombre: string;
  codigo: string;
}


export type AnimalForm = {
  nombre: string;
  descripcion: string;
  codigoAsociacion: string;
  idTipoAnimal: string;
  identificadorElectronico: string;
  proposito: string;
  color: string;
  genero: boolean;
  fechaNacimiento: Date;
  codigoIngreso: string;
  codigoSalida: string;
  tipoIngreso: string;
  tipoSalida: string;
  pesoActual: number;
  tamanoActual: number;
  unidadesAnimales: number;
  condicionCorporal: string;
  observacionNacimiento: string;
  observacionParto: string
}


export type AnimalSimplified = Omit<AnimalForm, "observacionNacimiento" | "observacionParto" | "codigoAsociacion"> & { codigo: string }


export type DesarrolloCrecimiento = {
  id: string;
  estado: string;
  fechaRegistro: string;
  pesoActual: number;
  tamaño: number;
  condicionCorporal: string;
  unidadesAnimal: string;
}

export type DesarrolloCrecimientoForm = Omit<DesarrolloCrecimiento, "id"> & {
  animalId: string
}

export type Animal = {
  id: string,
  descripcion: string,
  codigo: string,
  identificadorElectronico: string;
  proposito: string;
  color: string;
  fechaNacimiento: string,
  observaciones: string;
  genero: boolean
  tipoAnimal: TipoAnimal
  desarrollosCrecimiento: DesarrolloCrecimiento[]
}

export type ProduccionForm = {
  animalId: string;
  volumen: number;
  phLeche: number;
  ureaLeche: number;
  fechaRegistro: string;
  aflatoxinas: number;
}

export type Produccion = Exclude<ProduccionForm, "animalId"> & {
  animal: Animal,
  id: string
}
