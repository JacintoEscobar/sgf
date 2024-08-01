export interface TablaMovimientosProps {
  titulo: string;
  movimientos: Movimiento[];
  abrirModalAgregarMovimiento: (tipoNuevoMovimiento: string) => void;
  eliminarMovimiento: (id: string) => void;
}

export interface AgregarMovimientoProps {
  mostrarModal: boolean;
  cerrarModalAgregarMovimiento: (
    movimiento: Movimiento,
    guardar?: boolean
  ) => void;
  tipoNuevoMovimiento: string;
}

interface MovimientoI {
  id: string;
  concepto: string;
  descripcion: string;
  fecha: string;
  monto: number;
  tipo: string;
}

export class Movimiento implements MovimientoI {
  id: string;
  concepto: string;
  descripcion: string;
  fecha: string;
  monto: number;
  tipo: string;

  constructor(
    id = "",
    concepto = "",
    descripcion = "",
    fecha = "",
    monto = 0,
    tipo = ""
  ) {
    this.id = id;
    this.concepto = concepto;
    this.descripcion = descripcion;
    this.fecha = fecha;
    this.monto = monto;
    this.tipo = tipo;
  }
}
