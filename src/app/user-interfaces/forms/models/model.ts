import Dexie, { Table } from "dexie";
import {
  dat_atributo,
  dat_detallesconcepto,
  dat_matrizrelacional,
  dat_rolconcepto,
  nom_concepto,
  nom_tipoconcepto,
} from "./nomencladores";

//* Abstract entity model with `idgeneral` property initialization
// * and `equals` method for entity comparisons.

//formulario3 DB - Unidad de Alojamiento
export class dat_unidaddealojamiento {
  constructor(
    public idunidaddealojamiento: number,
    public circunscripcion: string,
    public cdr: string,
    public apto: string,
    public edificio: string,
    public sentrecalle: string,
    public pentrecalle: string,
    public numero: string,
    public direccion: string,
    public geolocalizacion: string,
    public idzonaresidencia: any,
    public idtipovivienda: any,
    public idasentamiento: any,
    public planturquino: boolean,
    public zonavulnerable: boolean,
    public idzonavulnerable: any,
    public idestructura: number
  ) { }
}

//formulario  - Datos del Hogar
export class dat_hogar {
  circunscripcion: string | undefined;
  constructor(
    public idcodigohogar: number,
    public nautahogar?: boolean,
    public propgastossld?: number,
    public propgastosmed?: number,
    public observaciones?: string,
    public idsituacionalegal?: number,
    public idestado?: number,
    public idtipogasto?: number,
    public idunidaddealojamiento?: number,
    public problemasalud?: number,
    public apoyolaboresd?: boolean,
    public ayudaprobleconomico?: boolean,
    public file?:string
  ) { }
}
export class dat_miembroenfbajaprev {
  constructor(
    public idmiembroenfbajaprev: number,
    public idenfermedad: number,
    public idmiembrohogar?: number,
    public idcodigohogar?: number
  ) { }
}

// Datos Estructura
export class dat_estructura {
  constructor(public idestructura: number) { }
}

// Datos Zona Vulneraable
export class dat_zonavulnerable {
  constructor(public idzonavulnerable: number) { }
}

// Datos Caracterización
export class dat_caracterizacion {
  constructor(
    public idcaracterizacion: number,
    public fechaentrev: string,
    public fregistro: string,
    public identrevistador: number,
    public hinicio: string,
    public hfin: string,
    public tipo: number,
    public idmiembrohogar?: string,
    public idcodigohogar?: string
  ) { }
}

// Datos Locales de Vivienda
export class dat_localesvivienda {
  constructor(
    public idlocalesvivienda: number,
    public cantudormir: number,
    public cantedormir: number,
    public tipousococina: boolean,
    public cantidadcocina: number,
    public cantidadsanitario: number,
    public idcombustible: number,
    public tienesanitario: boolean,
    public idtipousoservicio: boolean,
    public idcodigohogar?: number
  ) { }
}

// Datos Ubicacion Locales
export class dat_ubicacionlocales {
  constructor(
    public idubicacionlocal: number,
    public idtipoubicacion: number,
    public idcodigohogar: number,
    public idlocalesvivienda?: number
  ) { }
}

export class dat_ubicacionsanitaria {
  constructor(
    public idubicacionsanitario: number,
    public idlocalesvivienda: number,
    public idtiposanitario: number,
    public idubicacion: number,
    public idcodigohogar?: number
  ) { }
}

// Datos Hogar Diversidad Alimentaria
export class dat_hogardiversidadalimentaria {
  constructor(
    public idhogardiversidadalimentaria: number,
    public losencontro: string,
    public legustan: string,
    public frecuencia: string,
    public idcodigohogar: number,
    public idtipoalimento?: number
  ) { }
}

// Datos Configuracion de Dispositivos
export class conf_dispositivos {
  constructor(
    public iddispositivo: string,
    public idestructura?: string,
    public tabletUserReference?: string,
    public userName?: string,
    public paraCorregir?: true
  ) { }
}

// Datos Configuracion de Estado de Funcionalidad
export class conf_estadofuncionalidad {
  constructor(
    public idHogarFuncionalidades: number,
    public idfuncionalidad: number,
    public idestado: number,
    public idcodigohogar?: number
  ) { }
}

// Datos Servicios de la Vivienda
export class dat_seviciosvivienda {
  constructor(
    public idserviciosvivienda: number,
    public idinstalacionacueducto: number,
    public idfrecsumagua: number,
    public idprocedenciaagua: number,
    public iddesague: number,
    public idelectricidad: number,
    public idcodigohogar: number
  ) { }
}

// Datos Miembros Estrategias
export class dat_miembroestrategias {
  constructor(
    public idmiembroestrategia: number,
    public idestrategia: number,
    public idcodigohogar: number,
    
  ) { }
}

// Datos Afectacion Material Vivienda
export class dat_afectacionmatvivienda {
  constructor(
    public idafectacionemat: number,
    public idafectacion: string,
    public idcodigohogar: number
  ) { }
}

// Datos Estado de Construccion de la Vivienda
export class dat_estadoconstvivienda {
  constructor(
    public idestadoconstvivienda: number,
    public idestadoconst: string,
    public idcodigohogar: number
  ) { }
}

// Datos Hogar Mobiliarios Equipos
export class dat_hogarmobiliarioequipos {
  constructor(
    public idhogarmobiliarioequipo: number,
    public cantidad: number,
    public idmobiliarioequipo: number,
    public estado: number,
    public idcodigohogar: number
  ) { }
}

// Datos Hogar Mobiliarios Vehiculos
export class dat_hogarmobiliariovehiculos {
  constructor(
    public idhogarmobiliariovehiculo: number,
    public cantidad: number,
    public idmobiliariovehiculo: number,
    public estado: number,
    public tipomobiliario: number,
    public idcodigohogar: number
  ) { }
}
// Datos Hogar Gastos
export class dat_hogargastos {
  constructor(
    public idhogargasto: number,
    public iddestino: number,
    public idcodigohogar: number,
    public montocup?: number,
    public pesogasto?: number,
    public proporciongasto?: number
  ) { }
}

// Datos Miembro Encuesta
export class dat_miembroencuesta {
  constructor(
    public atendido: boolean,
    public idmiembroencuesta?: number,
    public idcodigohogar?: number,
    public idmiembrohogar?: number
  ) { }
}

// Datos Motivo Atencion
export class dat_motivonoatencion {
  constructor(
    public idmotivonoatencion: number,
    public idmotivo: number,
    public idrespuesta?: number,
    public otrosmotivos?: string,
    public idmiembrohogar?: number,
    public idcodigohogar?: number
  ) { }
}

// Datos Miembros del Hogae
export class dat_miembrohogar {
  constructor(
    public idmiembrohogar: number,
    public pnombre: string,
  
    public papellido: string,
    public idmiembroenfcronica: string,
  
    public cidentidad: number,
    public edad: number,
    public idcolorpiel: number,
    public dirscan: string, 
    
    public idsexo: number,
    public idparentesco: any,
    public idorientacionsex: number,
    public idnivelescolar: number,
    public idnivelescolargrado: number,
    public idgradovencido: number,
    public registroconsum: boolean,
    public idpamunicipionac: number,
    public datosmoviles: boolean,
    public estaembarazada: boolean,
    public lactando: boolean,
    public madremenor19: boolean,
    public redesapoyo: number,
    public certificado: boolean,
    public idcodigohogar: number,
  ) { }
}

// Datos Miembro de Autonomia
export class dat_miembrogradoautonomia {
  constructor(
    public idmiembrogradoautonomia: number,
    public idautonomia: string,
    public idcodigohogar?: number,
    public idmiembrohogar?: string
  ) { }
}

// Datos Tipos de Ayuda
export class dat_tiposayuda {
  constructor(
    public idtiposayuda: number,
    public idayuda: number,
    public idmiembrogradoautonomia?: number
  ) { }
}

// Datos Miembros de Discapacidad
export class dat_miembrodiscapacidad {
  constructor(
    public idmiembrodiscapacidad: number,
    public iddiscapacidad: number,
    public idcodigohogar?: number,
    public idmiembro?: number,
    public idmiembrohogar?: number
  ) { }
}

// Datos Miembros Aditamentos
export class dat_miembroaditamentos {
  constructor(
    public idmiembroaditamentos: number,
    public idaditamento: number,
    public disponeadit: boolean,
    public idcodigohogar?: number,
    public idmiembrohogar?: number
  ) { }
}

// Datos Miembros Beneficios
export class dat_miembrobeneficios {
  constructor(
    public idmiembrobeneficios: number,
    public idbeneficio: number,
    public idcodigohogar?: number,
    public idmiembrohogar?: number
  ) { }
}

// Datos Miembros Enfermedades Crónicas
export class dat_miembroenfcronicas {
  constructor(
    public idmiembroenfcronica: number,
    public idenfermedad: number,
    public accede: boolean,
    public idtipoenfermedad: number,
    public idcodigohogar?: number,
    public idmiembrohogar?: number
  ) { }
}

// Datos Vía de Acceso
export class dat_viasacceso {
  constructor(
    public idviacceso: number,
    public idmiembrohogar: string,
    public idtipoviaacceso: Array<any>,
    public idcodigohogar?: number,
    public idmiembroenfcronica?: number
  ) { }
}

// Datos Miembros Fuentes de Ingreso
export class dat_miembrofuentesingresos {
  constructor(
    public idmiembrofuentesingresos: number,
    public montomensual: number,
    public esotrafuente: string,
    public idmoneda: number,
    public idescala: number,
    public idfuente: number,
    public idcodigohogar?: number,
    public idmiembrohogar?: number
  ) { }
}

// Datos Miembro de Ocupacion
export class dat_miembroocupacion {
  constructor(
    public idmiembroocupacion: number,
    public idocupacion: number,
    public idtipotrabajando: String[],
    public idtiposintrabajar: String[],
    public motivo: String[],
    public idtipoocupacion: String[],
    public aquiencuida: String[],
    public idcodigohogar?: number,
    public idmiembrohogar?: number,
   

  ) { }
}
// Datos dat_polprogsoc
export class dat_polprogsoc {
  constructor(
    public idpolprogsoc: number,
    public idbeneficio: number,
    public accede: boolean,
    public idcodigohogar?: number,
    public idmiembrohogar?: number
  ) { }
}
// Datos dat_situacnnaj
export class dat_situacnnaj {
  // cambiada
  constructor(
    public idsituacnnaj: number, //esta
    public idsituacioneduc: number, //esta
    public idcodigohogar?: number, //esta
    public idmiembrohogar?: number, //esta ok
    public idcuidadoprimerainf?: number,
    public idcuidadohogar?: number,
    public idsne?: number,
    public idetp?: number
  ) { }
}

// Datos dat_nnaocupacion
export class dat_nnaocupacion {
  constructor(
    public idcodigohogar: number,
    public idmiembrohogar: number, //
    public idnnaocupacion: number,
    public idtipoactividad: number, //
    public idcanthoras: number, //
    public idhorario: number, //
    public autorizadomtss: number, //
    public idsituacnnaj?: number //
  ) { }
}

// Datos dat_miebrobeneficioprogalim
export class dat_miebrobeneficioprogalim {
  constructor(
    public idmiebrobeneficioprogalim: number,
    public idbeneficioprog: number,
    public idcodigohogar?: number,
    public idmiembrohogar?: number
  ) { }
}

// Datos Miembros Situacion Social
export class dat_miembrosituacionsocial {
  constructor(
    public idiembrosituacionsocial: number,
    public idsituacionsocial: number,
    public idcodigohogar?: number,
    public idmiembrohogar?: number
  ) { }
}

// Datos Hogares Estrategias
export class dat_hogarestrategias {
  constructor(
    public idhogarestrategia: number,
    public idestrategia: number,
    public dias: number,
    public idcodigohogar: number,
  ) { }
}

export class dat_situacionsocialorg {
  constructor(
    public idsituacionsocialorg: number,
    public idorganismo: number,
    public lotiene: boolean,
    public losnecesita: boolean,
    public idcodigohogar?: number,
    public idmiembrohogar?: number,

  ) { }
}

// Datos Miembo Programas
export class dat_miembropogramas {
  constructor(
    public idmiembroprograma: number,
    public idprograma: number,
    public idmiembrohogar: number,
    public idcodigohogar?: number
  ) { }
}

// Datos dat_nvinculacionmiembro
export class dat_nvinculacionmiembro {
  constructor(
    public idnvinculacionmiembro: number,
    public tipo: number, //ya
    public idcausa: number, //ya
    // public idmotivocuida: number,
    public idmotivodecision: number,
    // public idremuneraciones: number,
    public idcodigohogar?: number,
    public idmiembrohogar?: number
    // public idmiembroocupacion?: number,
  ) { }
}
// Datos remuneraciones
export class dat_remuneraciones {
  constructor(
    public idremuneraciones: number,
    public idnvinculacionmiembro: number,
    public remuneracion: number,
    public idcodigohogar?: number
  ) { }
}
// Datos remuneraciones
export class dat_quiencuida {
  constructor(
    public idquiencuida: number,
    public idnvinculacionmiembro: number,
    public idmiembrohogar: string,
    public idparentesco?: number,
    public cantidad?: string,
    public idcodigohogar?: number
  ) { }
}

// Datos Estado No Acceso
// Datos Estado No Acceso
export class dat_estadonoacceso {
  constructor(
    public idcausanoacceso: number,
    public idmiembrohogar: string,
    public idcausa: number,
    public conocequeexiste: boolean,
    public entramites: boolean,
    public ayudaparaacceder: boolean,
    public idpolprogsoc?: number,
    public idcodigohogar?: number
  ) { }
}

// Datos dat_causadesvnnaj
export class dat_causadesvnnaj {
  constructor(
    public idcausadesvnnaj: number,
    public idcausadesv: number,
    public otrascausas: string,
    public idmiembrohogar: any,
    public idsituacnnaj?: number
  ) { }
}

// Datos dat_nnasitdelictiva
export class dat_nnasitdelictiva {
  constructor(
    public idnnasitdelictiva: number,
    public idcodigohogar: number,
    public idtiposituacion: number,
    public idsituacnnaj?: number
  ) { }
}

export class dat_manejosdesechos {
  constructor(
    public idmanejodesechos: number,
    public idtipomanejos: number,
    public idcodigohogar: number
  ) { }
}
export class FamiliaCubana extends Dexie {
  conf_dispositivos!: Table<conf_dispositivos>;
  conf_estadofuncionalidad!: Table<conf_estadofuncionalidad>;
  dat_afectacionmatvivienda!: Table<dat_afectacionmatvivienda>;
  dat_atributo!: Table<dat_atributo>;
  dat_caracterizacion!: Table<dat_caracterizacion>;
  dat_causadesvnnaj!: Table<dat_causadesvnnaj>;
  dat_detallesconcepto!: Table<dat_detallesconcepto>;
  dat_estadoconstvivienda!: Table<dat_estadoconstvivienda>;
  dat_estadonoacceso!: Table<dat_estadonoacceso>;
  dat_estructura!: Table<dat_estructura>;
  dat_hogar!: Table<dat_hogar>;
  dat_hogardiversidadalimentaria!: Table<dat_hogardiversidadalimentaria>;
  dat_hogarestrategias!: Table<dat_hogarestrategias>;
  dat_hogargastos!: Table<dat_hogargastos>;
  dat_hogarmobiliarioequipos!: Table<dat_hogarmobiliarioequipos>;
  dat_hogarmobiliariovehiculos!: Table<dat_hogarmobiliariovehiculos>;
  dat_localesvivienda!: Table<dat_localesvivienda>;
  dat_manejosdesechos!: Table<dat_manejosdesechos>;
  dat_matrizrelacional!: Table<dat_matrizrelacional>;
  dat_miebrobeneficioprogalim!: Table<dat_miebrobeneficioprogalim>;
  dat_miembroaditamentos!: Table<dat_miembroaditamentos>;
  dat_miembrobeneficios!: Table<dat_miembrobeneficios>;
  dat_miembrodiscapacidad!: Table<dat_miembrodiscapacidad>;
  dat_miembroencuesta!: Table<dat_miembroencuesta>;
  dat_miembroenfbajaprev!: Table<dat_miembroenfbajaprev>;
  dat_miembroenfcronicas!: Table<dat_miembroenfcronicas>;
  dat_miembroestrategias!: Table<dat_miembroestrategias>;
  dat_miembrofuentesingresos!: Table<dat_miembrofuentesingresos>;
  dat_miembrogradoautonomia!: Table<dat_miembrogradoautonomia>;
  dat_miembrohogar!: Table<dat_miembrohogar>;
  dat_miembroocupacion!: Table<dat_miembroocupacion>;
  dat_miembropogramas!: Table<dat_miembropogramas>;
  dat_miembrosituacionsocial!: Table<dat_miembrosituacionsocial>;
  dat_motivonoatencion!: Table<dat_motivonoatencion>;
  dat_nnaocupacion!: Table<dat_nnaocupacion>;
  dat_nnasitdelictiva!: Table<dat_nnasitdelictiva>;
  dat_nvinculacionmiembro!: Table<dat_nvinculacionmiembro>;
  dat_polprogsoc!: Table<dat_polprogsoc>;
  dat_quiencuida!: Table<dat_quiencuida>;
  dat_remuneraciones!: Table<dat_remuneraciones>;
  dat_rolconcepto!: Table<dat_rolconcepto>;
  dat_seviciosvivienda!: Table<dat_seviciosvivienda>;
  dat_situacionsocialorg!: Table<dat_situacionsocialorg>;
  dat_situacnnaj!: Table<dat_situacnnaj>;
  dat_tiposayuda!: Table<dat_tiposayuda>;
  dat_ubicacionlocales!: Table<dat_ubicacionlocales>;
  dat_ubicacionsanitaria!: Table<dat_ubicacionsanitaria>;
  dat_unidaddealojamiento!: Table<dat_unidaddealojamiento>;
  dat_viasacceso!: Table<dat_viasacceso>;
  dat_zonavulnerable!: Table<dat_zonavulnerable>;
  nom_concepto!: Table<nom_concepto>;
  nom_tipoconcepto!: Table<nom_tipoconcepto>;

  constructor() {
    super("FamiliaCubana");
    this.version(1).stores({
      dat_situacionsocialorg:
        "++idsituacionsocialorg, idcodigohogar, idmiembrohogar, idorganismo, idsituacionsocial, lotiene, losnecesita",
      dat_unidaddealojamiento:
        "++idunidaddealojamiento, apto, edificio, sentrecalle,  pentrecalle, numero, circunscripcion, cdr, direccion, geolocalizacion, idzonaresidencia, idtipovivienda, idasentamiento, planturquino, zonavulnerable, idzonavulnerable, idestructura",
      dat_hogar:
        "++idcodigohogar,problemasalud, nautahogar, apoyolaboresd, ayudaprobleconomico, propgastossld, propgastosmed,observaciones, idsituacionalegal, idestado, idtipogasto, idunidaddealojamiento, file",
      dat_estructura: "++idestructura",
      dat_zonavulnerable: "++idzonavulnerable",
      dat_caracterizacion:
        "++idcaracterizacion, fechaentrev, fregistro, identrevistador, hinicio, hfin, tipo, idcodigohogar, idmiembrohogar",
      dat_localesvivienda:
        "++idlocalesvivienda, cantudormir, cantedormir, tipousococina, cantidadcocina, idcombustible, tienesanitario, idtipousoservicio, idtiposanitario, idcodigohogar",
      dat_ubicacionlocales:
        "++idubicacionlocal, idtipoubicacion, idlocalesvivienda,idcodigohogar",
      dat_hogardiversidadalimentaria:
        "++idhogardiversidadalimentaria, losencontro, legustan, frecuencia, idcodigohogar, idtipoalimento",
      conf_dispositivos: "++iddispositivo, idestructura, tabletUserReference, userName, paraCorregir",
      conf_estadofuncionalidad:
        "++idhogarfunciconalidades, idfuncionalidad, idestado, idcodigohogar",
      dat_seviciosvivienda:
        "++idserviciosvivienda, idinstalacionacueducto, idfrecsumagua, idprocedenciaagua,iddesague,idelectricidad, idcodigohogar",
      dat_miembroestrategias:
        "++idmiembroestrategia, idestrategia, idcodigohogar",
      dat_afectacionmatvivienda:
        "++idafectacionemat, idafectacion, idcodigohogar",
      dat_estadoconstvivienda:
        "++idestadoconstvivienda, idestadoconst, idcodigohogar",
      dat_hogarmobiliarioequipos:
        "++idhogarmobiliarioequipo, cantidad, idmobiliarioequipo, estado, idcodigohogar",
      dat_hogarmobiliariovehiculos:
        "++idhogarmobiliariovehiculo, cantidad, idmobiliariovehiculo, estado, tipomobiliario, idcodigohogar",
      dat_hogargastos:
        "++idhogargasto, iddestino, montocup, pesogasto, proporciongastoalimentacion, proporciongastomedicamento, idcodigohogar",
      dat_miembroencuesta:
        "++idmiembroencuesta, atendido,idcodigohogar, idmiembrohogar",
      dat_motivonoatencion:
        "++idmotivonoatencion, idmotivo, idcodigohogar, idmiembrohogar, idrespuesta, otrosmotivos",
      dat_miembrohogar:
        "++idmiembrohogar,idmiembroenfcronica, pnombre, papellido, cidentidad, edad, idcolorpiel, dirscan, fotocarne, idsexo, idparentesco, idorientacionsex, idnivelescolar, idgradovencido, registroconsum, idpamunicipionac, datosmoviles, estaembarazada, lactando, madremenor19, redesapoyo, certificado, idcodigohogar",
      dat_miembrogradoautonomia:
        "++idmiembrogradoautonomia, idautonomia, idcodigohogar, idmiembrohogar",
      dat_tiposayuda:
        "++idtiposayuda, idayuda, idcodigohogar, idmiembrogradoautonomia",
      dat_miembrodiscapacidad:
        "++idmiembrodiscapacidad, iddiscapacidad, idcodigohogar, idmiembro,idmiembrohogar",
      dat_miembroaditamentos:
        "++idmiembroaditamentos, idaditamento, disponeadit,idcodigohogar, idmiembrohogar",
      dat_miembrobeneficios:
        "++idmiembrobeneficios, idbeneficio,idcodigohogar, idmiembrohogar",
      dat_miembroenfcronicas:
        "++idmiembroenfcronica, idenfermedad, accede, idtipoenfermedad, idcodigohogar, idmiembrohogar",
      dat_viasacceso:
        "++idviacceso, idtipoviaacceso, idcodigohogar, idmiembrohogar, idmiembroenfcronica",
      dat_miembrofuentesingresos:
        "++idmiembrofuentesingresos, montomensual, esotrafuente, idmoneda, idescala, idfuente, idcodigohogar, idmiembrohogar",
      dat_miembroocupacion:
        "++idmiembroocupacion, motivo, idtiposintrabajar, idtipotrabajando, idocupacion, idtipoocupacion, idcodigohogar, idmiembrohogar,aquincuida",
      dat_polprogsoc:
        "++idpolprogsoc, idbeneficio, accede, idcodigohogar, idmiembrohogar",
      dat_situacnnaj:
        "++idsituacnnaj, idsituacioneduc, idcodigohogar, idmiembrohogar,idcuidadoprimerainf,idcuidadohogar,idsne,idetp",
      dat_nnaocupacion:
        "++idnnaocupacion,idmiembrohogar,idcodigohogar, idtipoactividad, idcanthoras, idhorario, autorizadomtss, idsituacnnaj",
      dat_miebrobeneficioprogalim:
        "++idmiebrobeneficioprogalim, idbeneficioprog, idcodigohogar, idmiembrohogar",
      dat_miembrosituacionsocial:
        "++idiembrosituacionsocial, idsituacionsocial, idcodigohogar, idmiembrohogar",
      dat_hogarestrategias:
        "++idhogarestrategia, idestrategia, dias, idcodigohogar",
      dat_miembropogramas:
        "++idmiembroprograma, idprograma, idcodigohogar, idmiembrohogar",
      dat_nvinculacionmiembro:
        "++idnvinculacionmiembro,tipo,idcausa,idmotivodecision,idcodigohogar,idmiembrohogar,idgeneral",
      dat_remuneraciones:
        "++idremuneraciones,idnvinculacionmiembro,remuneracion,idgeneral,idcodigohogar",
      dat_quiencuida:
        "++idquiencuida,idnvinculacionmiembro,idmiembrohogar,idparentesco,idcodigohogar,idgeneral,cantidad",
      nom_tipoconcepto:
        "++idtipoconcepto, denominacion, descripcion, fhasta, idtipo",
      dat_atributo: "++idatributo, denomicacion, tipo, idtipoconcepto",
      dat_detallesconcepto: "++iddetalles, dato, idtipoconcepto, idatributo",
      dat_rolconcepto: "++idrolconcepto, rol, idtipoconcepto",
      nom_concepto:
        "++idconcepto, idpadre, denominacion, nivel, fechafin, codigo, visible, idestructura, orden, idtipoconcepto",
      dat_matrizrelacional:
        "++idrelacion, fechafin, idestructura, idconceptorelacionado, idconceptopadre, idconceptopadrerel, idtipoconcepto",
      dat_manejosdesechos: "++idmanejodesechos, idtipomanejos, idcodigohogar",
      dat_estadonoacceso:
        " ++idcausanoacceso,idcausa,idpolprogsoc,idgeneral,conocequeexiste,entramites,idmiembrohogar,ayudaparaacceder,idcodigohogar",
      dat_miembroenfbajaprev:
        "++idmiembroenfbajaprev, idenfermedad, idmiembrohogar, idcodigohogar",
      dat_ubicacionsanitaria:
        "++idubicacionsanitario,idlocalesvivienda,idtiposanitario,idubicacion,idcodigohogar,idgeneral",
      dat_causadesvnnaj:
        " ++idcausadesvnnaj,idcausadesv,otrascausas,idsituacnnaj,idmiembrohogar",
      dat_nnasitdelictiva:
        "++idnnasitdelictiva,idtiposituacion,idsituacnnaj, idcodigohogar,idmiembrohogar",
    });
  }
}
export const datico = new FamiliaCubana();
