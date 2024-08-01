import "./tabla-movimientos.css";

import { TablaMovimientosProps } from "../../util/interfaces";
import { TiposMovimientos } from "../../util/enums";
import { formatCurrency } from "../../util/functions";
import { Movimiento } from "../../util/interfaces";

const TablaMovimientos = ({
  titulo,
  movimientos,
  abrirModalAgregarMovimiento,
  eliminarMovimiento,
}: TablaMovimientosProps) => {
  let total = 0;

  movimientos.forEach((movimiento) => (total += movimiento.monto));

  return (
    <section className="tabla-movimientos">
      <div>
        <span className="tabla-movimientos-titulo">{titulo}</span>
        <button
          className={
            "btn btn-" +
            (titulo === TiposMovimientos.INGRESO ? "success" : "danger")
          }
          onClick={() => abrirModalAgregarMovimiento(titulo)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-plus-circle mx-2"
            viewBox="0 0 16 16"
          >
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
          </svg>
        </button>
      </div>
      <table className="table">
        <thead>
          <tr
            className={
              "table-" +
              (titulo === TiposMovimientos.INGRESO ? "success" : "danger")
            }
          >
            <th>CONCEPTO</th>
            <th>DESCRIPCIÓN</th>
            <th>FECHA</th>
            <th>MONTO</th>
            <th>ACCIONES</th>
          </tr>
        </thead>
        <tbody>
          {movimientos.length === 0 ? (
            <tr key="">
              <td colSpan={5}>
                <center>Sin datos</center>
              </td>
            </tr>
          ) : (
            movimientos.map((movimiento: Movimiento, index: number) => (
              <tr key={index}>
                <td>{movimiento.concepto}</td>
                <td>{movimiento.descripcion}</td>
                <td>{movimiento.fecha}</td>
                <td>${movimiento.monto}</td>
                <td>
                  <button className="btn">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-pencil"
                      viewBox="0 0 16 16"
                    >
                      <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325" />
                    </svg>
                  </button>
                  <button className="btn">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-trash3-fill"
                      viewBox="0 0 16 16"
                      onClick={() => eliminarMovimiento(movimiento.id)}
                    >
                      <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5" />
                    </svg>
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
        <tfoot>
          {movimientos.length !== 0 && (
            <tr>
              <td colSpan={3}>
                <strong>Total:</strong>
              </td>
              <td colSpan={2}>
                <input
                  className="form-control"
                  type="number"
                  readOnly
                  disabled
                  placeholder={formatCurrency(total)}
                />
              </td>
            </tr>
          )}
        </tfoot>
      </table>
    </section>
  );
};

export default TablaMovimientos;
