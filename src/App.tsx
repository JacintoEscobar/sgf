import "./App.css";

import { useState } from "react";
import { TextosPredeterminados, TiposMovimientos } from "./util/enums";
import { formatCurrency } from "./util/functions";
import { Movimiento } from "./util/interfaces";
import MesSelect from "./components/mes-select/MesSelect";
import TablaMovimientos from "./components/tabla-movimientos/TablaMovimientos";
import AgregarMovimientoModal from "./components/modals/agregar-movimiento/AgregarMovimiento";
import { MovimientoService } from "./service/movimiento/MovimientoService";

function App() {
  const movimientoService = new MovimientoService();

  const [movimientos, setMovimientos] = useState<Movimiento[]>(
    movimientoService.getMovimientos()
  );
  const [mostrarModalAgregarMovimiento, setMostrarModalAgregarMovimiento] =
    useState(false);
  const [tipoNuevoMovimiento, setTipoNuevoMovimiento] = useState("");

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

  return (
    <main className="container">
      <MesSelect />

      <TablaMovimientos
        titulo={TiposMovimientos.INGRESO}
        movimientos={movimientos.filter(
          (movimiento) => movimiento.tipo === TiposMovimientos.INGRESO
        )}
        abrirModalAgregarMovimiento={abrirModalAgregarMovimiento}
      />

      <TablaMovimientos
        titulo={TiposMovimientos.EGRESO}
        movimientos={movimientos.filter(
          (movimiento) => movimiento.tipo === TiposMovimientos.EGRESO
        )}
        abrirModalAgregarMovimiento={abrirModalAgregarMovimiento}
      />

      <div>
        <span className="balance">Balance: </span>
        <span className="balance">
          {movimientos.length === 0
            ? TextosPredeterminados.NA
            : formatCurrency(total)}
        </span>
      </div>

      <AgregarMovimientoModal
        mostrarModal={mostrarModalAgregarMovimiento}
        cerrarModalAgregarMovimiento={cerrarModalAgregarMovimiento}
        tipoNuevoMovimiento={tipoNuevoMovimiento}
      />
    </main>
  );
}

export default App;
