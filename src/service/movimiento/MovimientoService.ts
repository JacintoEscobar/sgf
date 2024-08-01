import { MensajesExito, TiemposPredeterminados } from "../../util/enums";
import { mostrarMensajeExito } from "../../util/functions";
import { Movimiento } from "../../util/interfaces";

interface MovimientoServiceI {
  getMovimientos(): Movimiento[];
}

export class MovimientoService implements MovimientoServiceI {
  getMovimientos(): Movimiento[] {
    return JSON.parse(localStorage.getItem("movimientos") || "[]");
  }

  deleteMovimiento(id: string) {
    let movimientos = JSON.parse(
      localStorage.getItem("movimientos") || "[]"
    ) as Movimiento[];
    movimientos = movimientos.filter((movimiento) => movimiento.id !== id);
    localStorage.setItem("movimientos", JSON.stringify(movimientos));
    setTimeout(
      () => mostrarMensajeExito(MensajesExito.ELIMINACION_EXITOSA),
      TiemposPredeterminados.CUARTO_DE_SEGUNDO
    );
  }

  constructor() {}
}
