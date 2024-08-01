import "./App.css";

import { useState } from "react";
import {
  MensajesAdvertencia,
  TextosPredeterminados,
  TiposMovimientos,
} from "./util/enums";
import { formatCurrency, mostrarMensajeAdvertencia } from "./util/functions";
import { Movimiento } from "./util/interfaces";
import MesSelect from "./components/mes-select/MesSelect";
import TablaMovimientos from "./components/tabla-movimientos/TablaMovimientos";
import AgregarMovimientoModal from "./components/modals/agregar-movimiento/AgregarMovimiento";
import { MovimientoService } from "./service/movimiento/MovimientoService";
import EditarMovimiento from "./components/modals/editar-movimiento/EditarMovimiento";

function App() {
  const movimientoService = new MovimientoService();

  const [movimientos, setMovimientos] = useState<Movimiento[]>(
    movimientoService.getMovimientos()
  );
  const [mostrarModalAgregarMovimiento, setMostrarModalAgregarMovimiento] =
    useState(false);
  const [tipoNuevoMovimiento, setTipoNuevoMovimiento] = useState("");
  const [mostrarModalEditarMovimiento, setMostrarModalEditarMovimiento] =
    useState(false);
  const [movimientoEditar, setMovimientoEditar] = useState<Movimiento>();

  let total = 0;

  const abrirModalAgregarMovimiento = (tipoNuevoMovimiento: string) => {
    setMostrarModalAgregarMovimiento(true);
    setTipoNuevoMovimiento(tipoNuevoMovimiento);
  };

  const cerrarModalAgregarMovimiento = (
    movimiento: Movimiento,
    guardar: boolean = true
  ) => {
    setMostrarModalAgregarMovimiento(false);
    if (guardar) {
      movimientos.push(movimiento);
      setMovimientos(movimientos);
      localStorage.setItem("movimientos", JSON.stringify(movimientos));
    }
  };

  movimientos.forEach((movimiento) => (total += movimiento.monto));

  const eliminarMovimiento = (id: string) => {
    mostrarMensajeAdvertencia(MensajesAdvertencia.CONFIRMAR_ELIMINACION).then(
      (result) => {
        if (result) {
          movimientoService.deleteMovimiento(id);
          setMovimientos(
            JSON.parse(localStorage.getItem("movimientos") || "[]")
          );
        }
      }
    );
  };

  const abrirModalEditarMovimiento = (movimiento: Movimiento) => {
    setMostrarModalEditarMovimiento(true);
    setMovimientoEditar(movimiento);
  };

  const cerrarModalEditarMovimiento = (guardar: boolean = true) => {
    setMostrarModalEditarMovimiento(false);
    if (guardar)
      localStorage.setItem("movimientos", JSON.stringify(movimientos));
  };

  return (
    <main className="container">
      <MesSelect />

      <TablaMovimientos
        titulo={TiposMovimientos.INGRESO}
        movimientos={movimientos.filter(
          (movimiento) => movimiento.tipo === TiposMovimientos.INGRESO
        )}
        abrirModalAgregarMovimiento={abrirModalAgregarMovimiento}
        eliminarMovimiento={eliminarMovimiento}
        abrirModalEditarMovimiento={abrirModalEditarMovimiento}
      />

      <TablaMovimientos
        titulo={TiposMovimientos.EGRESO}
        movimientos={movimientos.filter(
          (movimiento) => movimiento.tipo === TiposMovimientos.EGRESO
        )}
        abrirModalAgregarMovimiento={abrirModalAgregarMovimiento}
        eliminarMovimiento={eliminarMovimiento}
        abrirModalEditarMovimiento={abrirModalEditarMovimiento}
      />

      <div>
        <span className="balance">Balance: </span>
        <span className="balance">
          {movimientos.length === 0
            ? TextosPredeterminados.NA
            : formatCurrency(total)}
        </span>
      </div>

      {mostrarModalAgregarMovimiento && (
        <AgregarMovimientoModal
          mostrarModal={mostrarModalAgregarMovimiento}
          cerrarModalAgregarMovimiento={cerrarModalAgregarMovimiento}
          tipoNuevoMovimiento={tipoNuevoMovimiento}
        />
      )}

      {mostrarModalEditarMovimiento && (
        <EditarMovimiento
          mostrarModal={mostrarModalEditarMovimiento}
          cerrarModalEditarMovimiento={cerrarModalEditarMovimiento}
          movimientoEditar={movimientoEditar as Movimiento}
        />
      )}
    </main>
  );
}

export default App;
