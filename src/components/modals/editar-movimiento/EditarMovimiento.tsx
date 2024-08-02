import { Modal, Button, Form } from "react-bootstrap";
import { EditarMovimientoProps, Movimiento } from "../../../util/interfaces";
import { MensajesError, TiposMovimientos } from "../../../util/enums";
import { mostrarMensajeError } from "../../../util/functions";
import { useState } from "react";

const EditarMovimiento = ({
  mostrarModal,
  cerrarModalEditarMovimiento,
  movimientoEditar,
}: EditarMovimientoProps) => {
  const [movimientoEditarTemporal, setMovimientoEditarTemporal] =
    useState<Movimiento>(
      new Movimiento(
        movimientoEditar.id,
        movimientoEditar.descripcion,
        movimientoEditar.descripcion,
        movimientoEditar.fecha,
        movimientoEditar.monto,
        movimientoEditar.tipo
      )
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

  return (
    <Modal
      show={mostrarModal}
      onHide={() => guardarMovimientoEditar(false)}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Editar {movimientoEditar.tipo}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form id="agregar-movimiento-form">
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>ID</Form.Label>
            <Form.Control
              name="id"
              type="text"
              value={movimientoEditar.id}
              disabled
              readOnly
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Concepto</Form.Label>
            <Form.Control
              name="concepto"
              type="text"
              placeholder="Pago del alquiler"
              onInput={handleInputChange}
              defaultValue={movimientoEditar.concepto}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              name="descripcion"
              type="text"
              placeholder="Pago del alquiler del mes de febrero"
              onInput={handleInputChange}
              defaultValue={movimientoEditar.descripcion}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Fecha</Form.Label>
            <Form.Control
              name="fecha"
              type="date"
              onChange={handleInputChange}
              defaultValue={movimientoEditar.fecha}
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
                movimientoEditar.tipo === TiposMovimientos.EGRESO
                  ? movimientoEditar.monto * -1
                  : movimientoEditar.monto
              }
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Tipo</Form.Label>
            <Form.Control
              disabled
              name="tipo"
              type="text"
              value={movimientoEditar.tipo}
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
