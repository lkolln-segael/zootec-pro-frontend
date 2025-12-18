export type PrenezForm = {
  fechaCelo: Date,
  fechaInseminacion: Date,
  fechaDiagnostico: Date,
  padreId: string,
  madreId: string
}


export interface RegistroReproduccionBase {
  tipo: string;
  id: string;
  fechaRegistro: string;
}

export interface Seca extends RegistroReproduccionBase {
  tipo: 'SECA';
  motivo: string;
}

export interface Prenez extends RegistroReproduccionBase {
  tipo: 'PRENEZ';
  fechaCelo: string;
  fechaInseminacion: string;
  fechaDiagnostico: string;
  madre: any;
  padre: any;
}

export interface ConfirmacionPrenez extends RegistroReproduccionBase {
  tipo: 'CONFIRMACION_PRENEZ';
  tipoConfirmacion: string;
}

export interface Aborto extends RegistroReproduccionBase {
  tipo: 'ABORTO';
  tipoAborto: string;
}

export interface Parto extends RegistroReproduccionBase {
  tipo: 'PARTO';
  numero: number;
}

export type RegistroReproduccion = Seca | Prenez | ConfirmacionPrenez | Aborto | Parto;
