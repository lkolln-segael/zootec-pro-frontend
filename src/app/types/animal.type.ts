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
