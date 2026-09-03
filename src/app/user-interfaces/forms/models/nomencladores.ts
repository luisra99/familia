export class nom_tipoconcepto {
  constructor(
    public idtipoconcepto: number,
    public denominacion: string,
    public descripcion: number,
    public fhasta: string,
    public idtipo: number
  ) {}
}

export class dat_atributo {
  constructor(
    public idatributo: number,
    public denomicacion: string,
    public tipo: number,
    public idtipoconcepto?: number
  ) {}
}

export class dat_detallesconcepto {
  constructor(
    public iddetalles: number,
    public dato: string,
    public idtipoconcepto?: number,
    public idatributo?: number
  ) {}
}

export class dat_rolconcepto {
  constructor(
    public idrolconcepto: number,
    public rol: string,
    public idtipoconcepto?: number
  ) {}
}

export class nom_concepto {
  constructor(
    public idconcepto: number,
    public idpadre: number,
    public denominacion: string,
    public nivel: number,
    public fechafin: string,
    public codigo: string,
    public visible: number,
    public idestructura: string,
    public orden: string,
    public idtipoconcepto?: number
  ) {}
}

export class dat_matrizrelacional {
  constructor(
    public idrelacion: number,
    public fechafin: string,
    public idestructura: number,
    public idconceptorelacionado?: number,
    public idconceptopadre?: number,
    public idconceptopadrerel?: number,
    public idtipoconcepto?: number
  ) {}
}
