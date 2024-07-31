import { Movimiento } from "../../util/interfaces";

interface MovimientoServiceI {
  getMovimientos(): Movimiento[];
}

export class MovimientoService implements MovimientoServiceI {
  getMovimientos(): Movimiento[] {
    return JSON.parse(localStorage.getItem("movimientos") || "[]");
  }

  constructor() {}
}
