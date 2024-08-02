import { Modal, Button, Form } from "react-bootstrap";
import { EditarMovimientoProps, Movimiento } from "../../../util/interfaces";
import { MensajesError, TiposMovimientos } from "../../../util/enums";
import { mostrarMensajeError } from "../../../util/functions";
import { useEffect, useState } from "react";
import {
  conceptoOtro,
  conceptosEgresos,
  conceptosIngresos,
} from "../../../util/constant";

const EditarMovimiento = ({
  mostrarModal,
  cerrarModalEditarMovimiento,
  movimientoEditar,
}: EditarMovimientoProps) => {
  const [movimientoEditarTemporal, setMovimientoEditarTemporal] =
    useState<Movimiento>(
      new Movimiento(
        movimientoEditar.id,
        movimientoEditar.concepto,
        movimientoEditar.descripcion,
        movimientoEditar.fecha,
        movimientoEditar.monto,
        movimientoEditar.tipo
      )
    );

  const [controlConcepto, setControlConcepto] = useState(
    conceptosIngresos.includes(movimientoEditar.concepto) ||
      conceptosEgresos.includes(movimientoEditar.concepto)
      ? movimientoEditar.concepto
      : conceptoOtro
  );

  const validarMovimientoEditar = () => {
    return (
      movimientoEditarTemporal.concepto !== "" &&
      movimientoEditarTemporal.descripcion !== "" &&
      movimientoEditarTemporal.fecha !== "" &&
      movimientoEditarTemporal.monto !== 0
    );
  };

  const guardarMovimientoEditar = (guardar: boolean = true): void => {
    if (guardar) {
      if (!validarMovimientoEditar()) {
        return mostrarMensajeError(MensajesError.INFORMACION_INVALIDA);
      }
      movimientoEditarTemporal.tipo === TiposMovimientos.EGRESO
        ? (movimientoEditarTemporal.monto *= -1)
        : movimientoEditarTemporal.monto;
      setMovimientoEditarTemporal(movimientoEditarTemporal);
      movimientoEditar.id = movimientoEditarTemporal.id;
      movimientoEditar.concepto = movimientoEditarTemporal.concepto;
      movimientoEditar.descripcion = movimientoEditarTemporal.descripcion;
      movimientoEditar.fecha = movimientoEditarTemporal.fecha;
      movimientoEditar.monto = movimientoEditarTemporal.monto;
      movimientoEditar.tipo = movimientoEditarTemporal.tipo;
      cerrarModalEditarMovimiento();
      return;
    }
    cerrarModalEditarMovimiento(guardar);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.target.name === "concepto"
      ? (movimientoEditarTemporal.concepto = event.target.value)
      : event.target.name === "descripcion"
      ? (movimientoEditarTemporal.descripcion = event.target.value)
      : event.target.name === "fecha"
      ? (movimientoEditarTemporal.fecha = event.target.value)
      : (movimientoEditarTemporal.monto =
          Number.parseFloat(event.target.value) || 0);
    setMovimientoEditarTemporal(movimientoEditarTemporal);
  };

  const controlarConcepto = (event: React.ChangeEvent<HTMLSelectElement>) =>
    setControlConcepto(event.target.value);

  useEffect(() => {
    controlConcepto === conceptoOtro
      ? (movimientoEditarTemporal.concepto = movimientoEditar.concepto)
      : (movimientoEditarTemporal.concepto = controlConcepto);
    setMovimientoEditarTemporal(movimientoEditarTemporal);
  }, [controlConcepto]);

  useEffect(() => {
    if (movimientoEditarTemporal.tipo === TiposMovimientos.EGRESO) {
      movimientoEditarTemporal.monto *= -1;
      setMovimientoEditarTemporal(movimientoEditarTemporal);
    }
  }, []);

  return (
    <Modal
      show={mostrarModal}
      onHide={() => guardarMovimientoEditar(false)}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Editar {movimientoEditarTemporal.tipo}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form id="agregar-movimiento-form">
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>ID</Form.Label>
            <Form.Control
              name="id"
              type="text"
              value={movimientoEditarTemporal.id}
              disabled
              readOnly
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Concepto</Form.Label>
            <Form.Select
              name="concepto"
              onChange={controlarConcepto}
              defaultValue={controlConcepto}
            >
              {movimientoEditarTemporal.tipo === TiposMovimientos.INGRESO
                ? conceptosIngresos.map((concepto) => (
                    <option key={concepto} value={concepto}>
                      {concepto}
                    </option>
                  ))
                : conceptosEgresos.map((concepto) => (
                    <option key={concepto} value={concepto}>
                      {concepto}
                    </option>
                  ))}
            </Form.Select>
            {controlConcepto === conceptoOtro && (
              <Form.Control
                className="concepto-otro"
                name="concepto"
                type="text"
                placeholder="Pago del alquiler"
                onInput={handleInputChange}
                defaultValue={movimientoEditar.concepto}
              />
            )}
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              name="descripcion"
              type="text"
              placeholder="Pago del alquiler del mes de febrero"
              onInput={handleInputChange}
              defaultValue={movimientoEditarTemporal.descripcion}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Fecha</Form.Label>
            <Form.Control
              name="fecha"
              type="date"
              onChange={handleInputChange}
              defaultValue={movimientoEditarTemporal.fecha}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Monto</Form.Label>
            <Form.Control
              name="monto"
              type="number"
              step={1}
              min={1}
              datatype="currency"
              placeholder="$100.00"
              onInput={handleInputChange}
              defaultValue={
                movimientoEditarTemporal.tipo === TiposMovimientos.EGRESO
                  ? movimientoEditarTemporal.monto * -1
                  : movimientoEditarTemporal.monto
              }
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Tipo</Form.Label>
            <Form.Control
              disabled
              name="tipo"
              type="text"
              value={movimientoEditarTemporal.tipo}
              onChange={handleInputChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={() => guardarMovimientoEditar(false)}
        >
          Cancelar
        </Button>
        <Button variant="primary" onClick={() => guardarMovimientoEditar()}>
          Guardar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditarMovimiento;
