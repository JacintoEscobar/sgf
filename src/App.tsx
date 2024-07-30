import "./App.css";

import { useState } from "react";
import { TextosPredeterminados, TiposMovimientos } from "./util/enums";
import { formatCurrency } from "./util/functions";
import { Movimiento } from "./util/interfaces";
import MesSelect from "./components/mes-select/MesSelect";
import TablaMovimientos from "./components/tabla-movimientos/TablaMovimientos";
import AgregarMovimientoModal from "./components/modals/agregar-movimiento/AgregarMovimiento";

function App() {
  const [movimientos, setMovimientos] = useState<Movimiento[]>([]);
  const [mostrarModalAgregarMovimiento, setMostrarModalAgregarMovimiento] =
    useState(false);
  const [tipoNuevoMovimiento, setTipoNuevoMovimiento] = useState("");

  let total = 0;

  const abrirModalAgregarMovimiento = (tipoNuevoMovimiento: string) => {
    setMostrarModalAgregarMovimiento(true);
    setTipoNuevoMovimiento(tipoNuevoMovimiento);
  };

  const cerrarModalAgregarMovimiento = (movimiento: Movimiento) => {
    setMostrarModalAgregarMovimiento(false);
    movimientos.push(movimiento);
    setMovimientos(movimientos);
  };

  movimientos.forEach((movimiento) => {
    if (movimiento.tipo === "egreso") movimiento.monto *= -1;
    total += movimiento.monto;
  });

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
